import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
//Redux
import { Provider } from 'react-redux'
import createStore from './reducks/store/store'
//Reduxのstoreでのルーティング管理
import { ConnectedRouter } from 'connected-react-router'
import * as History from 'history'//v4.10.1
//ルーティング情報を取得
const history = History.createBrowserHistory();
//storeを取得する、ルーティング情報をcreateStoreに引数として渡す
export const store = createStore(history);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
    </Provider >,
  document.getElementById('root') 
);
reportWebVitals();
