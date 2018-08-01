import { delay } from 'redux-saga';
import { takeLatest, takeEvery, put, call, select } from 'redux-saga/effects';
import store from 'store';
import DOMParser from 'dom-parser';
import actions, { types } from '../actions';
import { getItems } from '../selectors';

const writeItems = items => store.set('items', items);

function* queryForIcons({ payload }) {
  const { id, text } = payload;
  if (!text) {
    return;
  }

  try {
    const response = yield call(fetch, `https://api.icons8.com/api/iconsets/search?term=${text}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      redirect: "follow",
      referrer: "no-referrer",
    });
    const body = yield response.text();
    const dom = new DOMParser().parseFromString(body);
    const icons = dom.getElementsByTagName('svg')
      .map(node => new Buffer(node.innerHTML, 'base64')
        .toString("ascii")
        .replace('<?xml version="1.0" encoding="UTF-8"?>', '')
        .trim())
      .filter(icon => icon.length > 0);
    if (icons.length > 0) {
      yield put(actions.updateItemIcon(id, icons[Math.floor(Math.random() * icons.length)]))
    }
  } catch (err) {
    console.log('Failed to query api', err);
  }
}

function* saveState() {
  yield delay(2000);
  const items = yield select(getItems);
  yield call(writeItems, items);
}

function* rootSaga() {
  yield takeEvery([
    types.ADD,
    types.UPDATE_ITEM,
  ], queryForIcons);
  yield takeLatest([
    types.ADD,
    types.TOGGLE_ITEM,
    types.UPDATE_ITEM,
    types.REMOVE_ITEM,
    types.CLEAR_COMPLETED,
    types.DRAG_END,
  ], saveState)
}

export default rootSaga;
