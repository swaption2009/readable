import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import promise from 'redux-promise'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PostShow from "./components/PostShow"
import PostsIndex from "./components/PostsIndex"
import createHistory from 'history/createBrowserHistory'
import NewPost from "./forms/NewPost";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewComment from "./forms/NewComment";
import EditPost from "./forms/EditPost"

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
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <BrowserRouter >
        <Switch history={history}>
          <Route exact path="/" component={App} />
          <Route exact path="/:category" component={App} />
          <Route exact path="/posts/new" component={NewPost} />
          <Route exact path="/posts" component={PostsIndex} />
          <Route exact path="/posts/:id/comments/new" component={NewComment} />
          <Route exact path="/posts/:id/edit" component={EditPost} />
          <Route exact path="/posts/:id" component={PostShow} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
