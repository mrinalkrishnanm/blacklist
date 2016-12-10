import React from 'react';
import Router, {Link} from 'react-router';
import UserNavbar from './UserNavbar.jsx';
import API from './API.js';
import StarRating from 'react-star-rating';

class CodeDesc extends React.Component{
  constructor(){
    super()
    this.state = {
      result: {},
      isLoadUser: true,
      isLoadCode: true
    }
  }
  
  componentDidMount() {
    var id  = this.props.params.id
    
    var url = API.url('codes',id)

    
    var success = (res) => {
      console.log('success')
      console.log(res)
      this.setState({result: res,isLoadCode: false})
    }

    var failure = function(res) {
      console.log('failure')
    }

    API.get(url,success,failure)  


    var token = localStorage.codedammit_token

    var _data = {
      token: token
    }

    var _url = API.url('tokens/verify_token')

    var _success = (res) => {
      console.log(res)
      this.setState({user:res, isLoadUser: false})
    }

    var _failure = (res) => {
      console.log("Failed to verify")
      console.log(res)
      
    }

    API.post(_url,_data,_success,_failure)

  }

  handleRate(e, {position, rating, caption, name}) {
    e.preventDefault()
    console.log("rated" + rating + " " + position)
    var el = document.getElementsByClassName('rsr-container')[0]
    el.style.display = "none"
    localStorage.hasRated = true
    var x = document.getElementsByClassName('code-desc-body')[0]
    var newEl = document.createElement('h3')
    newEl.style.color = '#db4860'
    newEl.innerHTML = "Thanks for rating!"
    x.appendChild(newEl)
  }

  render() {
    return this.state.isLoadUser && this.state.isLoadCode ? this.renderLoader() : this.renderContent()
  }

  renderLoader() {
    return(
    <div id="loader">
      <img src="img/loading.gif" />
      <h1> Loading... Please wait a moment! </h1>
    </div>
    )
  }
  previousPage() {
    console.log(Router.History)
    this.context.router.goBack();
  }
  renderContent(){
    var code = this.state.result
    var lang = _.capitalize(code.language)
    var diff = _.capitalize(code.difficulty)

    if(localStorage.hasRated)
      var display = <h3 style={{color: '#db4860'}}> Thanks for rating!</h3>
    else
      var display = <StarRating className="star-rating" name="airbnb-rating" size={20}
                     totalStars={5} onRatingClick={this.handleRate.bind(this)} />

    if(!_.isEmpty(code.link))
      var displayButton = (<div className="btn-wrapper">
        <a href={code.github_link}>
          <button className="link-btn"> View Github </button> 
        </a>
        <a href={code.link}> 
          <button className="link-btn"> View Website </button> 
        </a>
                            </div>)
    else
      var displayButton = <a href={code.github_link}><button className="link-btn full-width"> View Github </button></a>


    if(!this.state.isLoadUser)
      var displayNav = <h1> Welcome, {_.capitalize(this.state.user.username)} </h1>
    else
      var displaynav = <Link to="login"><button className='sign-in'>Login / Register</button></Link> 

    if(Router.History.length > 1)
      var goback = <button className="goback" onClick={this.previousPage.bind(this)}> <b>&lt;-</b> Go Back</button>
    else
      var goback = ""
      
    return(
      <div className = 'description-container'>
        <div className="header-wrapper">
          <div className="header">
            <div className="logo">
              <Link to="app"><img src="img/logo2.png" /></Link>
            </div>
          </div>
        </div>
        <div className="code-desc-wrapper">
          {goback}
          <div className="code-desc-header">
            <h1>{code.name}</h1>
            <p>{code.description}</p>
          </div>
          <div className="code-desc-body">
            <div className="code-desc-options">
              <h2> Difficulty </h2>
              <h2> Language </h2>
              <h2> Rating <small>(4.6/5)</small> </h2>
              <h3> {diff} </h3>
              <h3>{lang}</h3>
              {display}
            </div>
            {displayButton}
          </div>
        </div>
        <footer>
          <h6> Copyright © CodeDammit 2016 </h6>
        </footer>
      </div>   
                                )
  }
}

CodeDesc.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = CodeDesc;
