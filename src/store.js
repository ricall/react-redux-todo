import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createHistory from "history/createHashHistory";
import rootReducer from './reducers';
import rootSaga from './sagas';


export const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers({
  ...rootReducer,
}), composeEnhancers(applyMiddleware(
  thunk,
  sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;

