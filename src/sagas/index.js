import { delay } from 'redux-saga';
import { fork, takeLatest, put, call, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import store from 'store';
import actions, { types } from '../actions';
import { getItems } from '../selectors';

const writeItems = items => store.set('items', items);

function* chuckNorrisQuerySaga() {
  while (true) {
    try {
      const response = yield call(fetch, 'https://api.chucknorris.io/jokes/random');
      const body = yield response.json();
      yield put(actions.chuckNorrisQuote(body.value));
    } catch (err) {
      console.log('Failed to query api', err);
    }
    yield delay(10000);
  }
}

function* saveState() {
  yield delay(2000);
  const items = yield select(getItems);
  yield call(writeItems, items);
}

function* rootSaga() {
  yield fork(chuckNorrisQuerySaga);
  yield takeLatest([
    types.ADD,
    types.TOGGLE_ITEM,
    types.UPDATE_ITEM,
    types.REMOVE_ITEM,
    types.CLEAR_COMPLETED,
    types.DRAG_END
  ], saveState)
}

export default rootSaga;
