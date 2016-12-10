import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import API from './API.js'

class UserLogin extends React.Component{

  constructor(){
    super()
  }


  handleLogin(e){
    e.preventDefault()
    var username = this.refs.username.value;
    var password = this.refs.password.value;

    var user={
      username:username,
      password:password
    }
    
    var url = API.url('tokens/verify')
    var success = (res) => {
      console.log(res)
      localStorage.codedammit_token = res.token
      this.context.router.transitionTo('app')
    }

    var failure = (res) => {
      console.log(res)
    }

    API.post(url,user,success,failure)
  }
  render(){
    return(
      <div className='container-bg'>
        <div className='container-box'>
          <h3> Login </h3>
          <input ref="username" type="text" placeholder="username" />
          <input ref="password" type="password" placeholder="password" />
          <button className="submit-long" onClick={this.handleLogin.bind(this)}> Log me in! </button>
        </div>
      </div>
    )
  }

}

UserLogin.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = UserLogin;
