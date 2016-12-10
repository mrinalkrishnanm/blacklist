import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import UserNavbar from './UserNavbar.jsx';
import Filterbar from './Filterbar.jsx';

class UserDashBoard extends React.Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div className='dashboard'>
				<UserNavbar />
				<Filterbar />
			</div>
			)
	}
}

module.exports = UserDashBoard;