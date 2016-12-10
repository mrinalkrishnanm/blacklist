 import React from 'react';
import Router from 'react-router';
import Request from 'superagent';

class UserNavbar extends React.Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div className='Navbar'>
				<ul className='Navbar-contents'>
          <h2 className="logo">&lt;CodeDammit/&gt;</h2>
				</ul>
			</div>
			)
	}
}

module.exports = UserNavbar;
