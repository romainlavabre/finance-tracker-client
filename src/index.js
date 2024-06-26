import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from './store/store';
import Router from "./router/Router";
import 'tw-elements';
import './assets/css/index.css'
import Alert from "./component/util/modal/Alert";
import Confirm from "./component/util/modal/Confirm";
import Info from "./component/util/modal/Info";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Alert/>
            <Info/>
            <Confirm/>
            <Router/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytic endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
