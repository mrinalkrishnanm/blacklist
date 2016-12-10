import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import API from './API.js'

class UserRegister extends React.Component{
  constructor(){
    super()
  }

  registerUser(e){
    e.preventDefault();
    var firstName = this.refs.firstname.value
    var lastName  = this.refs.lastname.value
    var email     = this.refs.email.value
    var username  = this.refs.username.value 
    var password  = this.refs.password.value

    var data = {
      user : {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password
      }
    }


    var url = API.url("users")
    var _this = this
    var success = (res) => {
      console.log(res)
      this.context.router.transitionTo('login')
    }

    var failure = (res) => {
      console.log(res)
    }

    API.post(url,data,success,failure)
  }

  render(){
    return(
      <div className="container-bg"> 	
        <div className="container-box">
          <h3> Register </h3>
          <input ref="firstname" type="text" placeholder="First Name" name="first name" />
          <input ref="lastname" type="text" placeholder="Last Name" name="last name" />
          <input ref="email" type="text" placeholder="Email" name="email" /> 
          <input ref="username" type="text" placeholder="Username" name="username" />
          <input ref="password" type="password" placeholder="Password" name="password" />
          <button className="submit-long" onClick={this.registerUser.bind(this)}> Register </button>
        </div>
      </div>
    )
  }

}

UserRegister.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = UserRegister;
