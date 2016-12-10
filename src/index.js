import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory, useRouterHistory } from 'react-router';
var createHashHistory = require('../node_modules/react-router/node_modules/history').createHashHistory;
import UserRegister from './UserRegister.jsx';
import UserLogin from './UserLogin.jsx';
import UserDashBoard from './UserDashBoard.jsx';
import SearchCode from './SearchCode.jsx';
import CreateCode from './CreateCode.jsx';
import CodeDesc from './CodeDesc.jsx' ;
import HomePage from './HomePage.jsx';
import Term from './Term.jsx';
import style from '../styles/app.scss';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })



var app = document.getElementById('app')
ReactDOM.render(
    <Router history={appHistory} >
      <Route path="/" component={HomePage} > </Route>
      <Route path="/register" component={ UserRegister } ></Route>
      <Route path="login" component={ UserLogin } ></Route>
      <Route path="dashboard" component={ UserDashBoard }></Route>
      <Route path="search" component={ SearchCode } ></Route>
      <Route path="create" component={ CreateCode } ></Route>
      <Route path="codes/:id" component={ CodeDesc } ></Route>
      <Route path="term" component={ Term } ></Route>
    </Router>
,app);
