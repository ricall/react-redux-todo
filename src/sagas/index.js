import { put, call } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import actions from '../actions';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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

export default chuckNorrisQuerySaga;
