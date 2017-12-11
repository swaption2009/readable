import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers'
import promise from 'redux-promise'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PostShow from "./components/PostShow";
import PostsIndex from "./components/PostsIndex";
import createHistory from 'history/createBrowserHistory';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(promise)
  )
)

export const history = createHistory()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <Switch history={history}>
        <Route exact path="/" component={App} />
        <Route exact path="/posts" component={PostsIndex} />
        <Route path="/posts/:id" component={PostShow} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
