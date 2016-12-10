import React from 'react';
import Router, {Link} from 'react-router';
import UserNavbar from './UserNavbar.jsx';
import Request from 'superagent';
import Select from 'react-select';
import API from './API.js';

class CreateCode extends React.Component{
  constructor(){
    super()
    this.state={
      language: 'Language',
      difficulty: 'Difficulty',
      category: 'Category',
      isLoggedIn: false 
    }
  }

  componentDidMount() {
    var token = localStorage.codedammit_token

    var data = {
      token: token
    }

    var url = API.url('tokens/verify_token')

    var success = (res) => {
      console.log(res)
      this.setState({user:res, isLoggedIn: true})
    }
    var failure = (res) => {
      console.log("Failed to verify")
      console.log(res)
      this.context.router.transitionTo('login')
    }

    API.post(url,data,success,failure)
  }
  handleSubmit(e){
    e.preventDefault();
    var codename = this.refs.name.value
    var language = this.state.language
    var difficulty = this.state.difficulty
    var app_link = this.refs.app_link.value
    var github_link = this.refs.github_link.value
    var category = this.state.category
    var description = this.refs.description.value

    var data={
      name: codename,
      language: language,
      difficulty: difficulty,
      link: app_link,
      github_link: github_link,
      category: category,
      description: description
    }
    console.log(data);
    var _this = this
    var url = API.url('codes')
    var success = function(res) {
      console.log(res)
    }
    var failure = function(res) {
      console.log(res) 
    }
    API.post(url,data,success,failure);
  }
  changeLang(val) {
    this.setState({ language: val})
  } 

  changeDiff(val) {
    this.setState({ difficulty: val})
  } 

  changeCat(val){
    this.setState({ category: val })
  }

  render() {
    return this.state.isLoggedIn ? this.renderContent() : this.renderLoader()
  }

  renderLoader() {
    return(
    <div id="loader">
      <img src="img/loading.gif" />
      <h1> Loading... Please wait a moment! </h1>
    </div>
    )
  }
  
  renderContent(){
    var language=this.state.language
    var difficulty=this.state.difficulty
    var category=this.state.category

    if(category=="web")
      var options = [
        { value: 'ruby', label: 'Ruby' },
        { value: 'python', label: 'Python' },
        { value: 'clojure', label: 'Clojure' },
        { value: 'haskell', label: 'Haskell' },
        { value: 'javascript', label: 'Javascript' },
        { value: 'go', label: 'Go' },
        { value: 'php', label: 'PHP' },
        { value: 'html', label: 'HTML/CSS' }]

    else if(category == "mobile")
      var options = [
          { value: 'android', label: 'Android'},
          { value: 'ios', label: 'iOS' },
          { value: 'native', label: 'React Native' }]

    else if(category == "snippet")
      var options = [
            { value: 'ruby', label: 'Ruby' },
            { value: 'python', label: 'Python' },
            { value: 'clojure', label: 'Clojure' },
            { value: 'haskell', label: 'Haskell' },
            { value: 'javascript', label: 'Javascript' },
            { value: 'go', label: 'Go' },
            { value: 'html', label: 'HTML/CSS' }, 
            { value: 'c', label: 'C' },
            { value: 'c++', label: 'C++' },
            { value: 'c#', label: 'C#' },
            { value: 'java', label: 'Java' }]

      var d_options = [
            { value: 'easy', label: 'Easy'},
            { value: 'medium', label: 'Medium'},
            { value: 'hard', label: 'Hard'}]

      var c_options =[
            { value: 'web',label:'Web App'},
            { value: 'mobile',label:'Mobile App'},
            { value: 'snippet',label:'Code Snippet'}]

      if(this.state.isLoggedIn)
        var display = (
          <div className='createcode-wrapper'>
            <div className='code-container'>
              <input ref="name" type="text" placeholder="Title" className="code_name"/>

              <Select
                name='category-select'
                className='select'
                value={category}
                onChange={this.changeCat.bind(this)}
                options={c_options}
                searchable={false}
                />


              <Select
                name='difficulty-select'
                className='difficulty-field'
                value={difficulty}
                onChange={this.changeDiff.bind(this)}
                options={d_options}
                searchable={false}
                />


              <Select
                name='language-select'
                className='select'
                value={language}
                onChange={this.changeLang.bind(this)}
                options={options}
                searchable={false}
                />
              <input ref="app_link" type="text" placeholder="Website (optional)" className="app_link" />
              <input ref="github_link" type="text" placeholder="GitHub URL" className="github_link" />	
              <textarea ref="description" id="txtArea" rows="8" placeholder="Enter description about the code"></textarea>
              <button className="submit_long" onClick={this.handleSubmit.bind(this)}> Submit </button>
          </div>
      </div>)
    else
     display = ""

   if(this.state.isLoggedIn)
    var displayLogin = <h1> Welcome, {_.capitalize(this.state.user.username)} </h1>
   else
    var displayLogin = <button className='sign-in'>Login / Register</button>                   
  
  return(
    
    <div className = 'createcode-outer-wrapper'>
      <div className="header-container">
        <div className="header">
          <div className="logo">
            <Link to="app"> <img src="img/logo2.png" /> </Link>
          </div>
          {displayLogin}
        </div>
      </div>
      {display}
      <footer>
        <h6> Copyright © CodeDammit 2016 </h6>
      </footer>
    </div>)
  

  }

}

CreateCode.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = CreateCode;
