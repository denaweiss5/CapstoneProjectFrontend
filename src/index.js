import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import { BrowserRouter} from 'react-router-dom'
import history from './history'



const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App history={history} />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);