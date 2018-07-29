import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import store, { history } from './store';
import Todo from './components/Todo';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/:filter?" exact={false} component={Todo} />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
