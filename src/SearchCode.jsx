import React from 'react';
import Router , { Link } from 'react-router';
import Request from 'superagent';
import UserNavbar from './UserNavbar.jsx';
import Select from 'react-select';
import _ from 'lodash';
import CodeResultList from './CodeResultList.jsx';
import API from './API.js';
import Filterbar from './Filterbar.jsx';
import WebSidebar from './WebSidebar.jsx';
import MobileSidebar from './MobileSidebar.jsx';
import SnippetSidebar from './SnippetSidebar.jsx';
import dynamics from 'dynamics.js';

class SearchCode extends React.Component{
  constructor(){
    super()
    this.state = {
      isSearching: false,
      newResult: [],
      searchable: false,
      noMatchFlag: false,
      keyword: "",
      category: "",
      difficulty: "",
      language: ""
    }
  }

  componentDidMount() {
    var category = this.props.query.category
    if(!_.isEmpty(category))
      this.handleCategoryFilter(null, category)

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
    }

    API.post(url,data,success,failure)


  }
  componentWillReceiveProps(nextProps) {
    var category = nextProps.query.category
    console.log(nextProps.query.category)
    
    if(!_.isEmpty(category))
      this.handleCategoryFilter(null, category)

  }

  handleSubmit(e) {

    //e.preventDefault();
    console.log(e.which)
    var keyword = this.refs.keyword.value.trim()
    var category = this.state.category

    if(e.which == 13)
      {
        this.setState({isSearching:true})

        var _data  = {

          keyword: keyword,
          category: category

        }

        var _this = this
        var url = API.url('codes/search')
        var success = function(res) {
          console.log(res)
          _this.setState({result : res, keyword: keyword, isSearching: false})
        }
        var failure = function(res) {
          console.log(res)
          _this.setState({isError: true, isSearching: false})

        }
        API.post(url,_data,success,failure);

      }
  }

  handleLanguageFilter(e,language) {
    console.log(language)
    var category = this.state.category
    var keyword = this.state.keyword
    
    this.setState({isSearching:true})

    var data = {
      category: category,
      language: language
    }
    if(!_.isEmpty(keyword)) 
      data.keyword = keyword


    var url = API.url('codes/search')
    var _this = this
    var success = function(res) {
      console.log(res)
      _this.setState({result: res, language: language, isSearching: false})
    }
    var failure = (res) => {
      console.log(res)
      this.setState({isError: true, isSearching: false})
    }

    API.post(url,data,success,failure)
  }


  changeCategoryState(category) {

    if(category=="web")
      this.setState({isWeb: true, isMobile: false, isSnippet: false}, 
                     this.animateSidebar.bind(this))
    else if(category=="mobile")
      this.setState({isMobile: true, isWeb: false, isSnippet: false},
                     this.animateSidebar.bind(this))
    else
      this.setState({isSnippet: true, isWeb: false, isMobile: false}, 
                     this.animateSidebar.bind(this))

  }

  handleCategoryChange(e,category) {
    e.preventDefault();
    this.context.router.transitionTo('searchcode',null,{category: category})
  }

  handleCategoryFilter(e,category) {
    console.log(category)

    var url = API.url('codes/search')
    var data = {
      category: category
    }

    this.setState({isSearching:true})

    this.changeCategoryState(category);



    //ANIMATION CHAIN BEGINNING GOES HERE
    var success = (res) => {
      console.log(res)
      this.setState({result: res, category: category, isSearching: false}, 
                    this.animateCategoryMenu.bind(this))
    }

    var failure = (res) => {
      console.log(res)
      this.setState({category: category,
                    isSearching: false,
                    isError: true})
    }

    API.post(url,data,success,failure);
  }

  handleDifficultyFilter(e,difficulty) {

    console.log(difficulty)
    this.setState({isSearching:true})

    var keyword = this.state.keyword
    var category = this.state.category
    var language = this.state.language

    var data = {
      category: category,
      difficulty: difficulty
    }
    if(!_.isEmpty(keyword))
      data.keyword = keyword
    if(!_.isEmpty(language))
      data.language = language

    var url = API.url('codes/search')

    var success = (res) => {
      console.log(res)
      this.setState({result: res, difficulty: difficulty, isSearching: false})
    }

    var failure = (res) => {
      console.log(res)
      this.setState({isError: true, isSearching: false})
    }

    API.post(url,data,success,failure)
  } 

  animateCategoryMenu() {
    var el = document.getElementsByClassName('filter-bar')[0]
    dynamics.animate(el, {
      width: '74.41059%'
    }, {
      type: dynamics.bezier,
      duration: 500,
      points: [{"x":0,"y":0,"cp":[{"x":0.1,"y":0}]},{"x":1,"y":1,"cp":[{"x":0.9,"y":1}]}],

      complete: this.toggleSearchable.bind(this)
    })

  }

  toggleSearchable() {
    this.setState({searchable: true}, this.animateSearchbar.bind(this))
  }

  animateSearchbar() {
    var el = document.getElementsByClassName('search-options')[0]
    console.log(el)
    dynamics.animate(el, {
      translateY: 100
    }, {
      type: dynamics.gravity,
      duration: 400
    })
  }


  animateSidebar() {
    var isWeb = this.state.isWeb
    var isMobile = this.state.isMobile
    var isSnippet = this.state.isSnippet
    var el = document.getElementsByClassName('filter-option-container')[0]
    dynamics.animate(el, {
      translateX: 200
    }, {
      type: dynamics.gravity,
      duration: 400
    })


  }

  render(){
    var display_none = <h2 className="no-result"> No Results </h2>
    var language = this.state.language

    var flag = this.state.noMatchFlag
    var searchable = this.state.searchable
    var isWeb = this.state.isWeb
    var isMobile = this.state.isMobile
    var isSnippet = this.state.isSnippet
    var result = this.state.result

    if(!_.isEmpty(result))
    {
        var el = document.getElementsByClassName('search-result-wrapper')[0];
        el.style.height = 'auto';
    }
    else
    {
        var el = document.getElementsByClassName('search-result-wrapper')[0];
        //el.style.height = '100%';
        console.log(el)
    }

    if(this.state.isSearching)
      var displayResult = (<div className="loader">
                              <img src="img/loading.gif" />
                              <h1> Loading... Please wait a moment! </h1>
                            </div>)
    else if(!_.isEmpty(result))
      var displayResult = <CodeResultList codes={this.state.result} />

    else if(!searchable)
      var displayResult = ""

    else
      var displayResult = display_none


    if(this.state.isLoggedIn)
      var displayNav = <h1> Welcome, {_.capitalize(this.state.user.username)} </h1>
    else
      var displaynav = <Link to="app"><button className='sign-in'>Login / Register</button></Link> 

    if(isWeb)
      var displaySidebar =   <WebSidebar
        languageFilter={this.handleLanguageFilter.bind(this)}
        difficultyFilter={this.handleDifficultyFilter.bind(this)}
        />
    else if(isMobile)
      var displaySidebar =    <MobileSidebar
          languageFilter={this.handleLanguageFilter.bind(this)}
          difficultyFilter={this.handleDifficultyFilter.bind(this)}
          />
    else if(isSnippet)
      var displaySidebar =    <SnippetSidebar
            languageFilter={this.handleLanguageFilter.bind(this)}
            difficultyFilter={this.handleDifficultyFilter.bind(this)}
            />
    else
      var displaySidebar = ""



          if(searchable)
            var displaySearchBar = ( <div className="search-options">
              <input ref="keyword" type="text" onKeyDown={this.handleSubmit.bind(this)} placeholder="Enter keyword" />
            </div>
                                   )
                                   return(
                                     <div className="search-code-container">
                                       <div className="header-wrapper">
                                         <div className="header">
                                           <div className="logo">
                                             <Link to="app"> <img src="img/logo2.png" /> </Link>
                                           </div>
                                         </div>
                                       </div>
                                       <div className="search-result-wrapper">
                                         {displaySidebar}
                                         <div className="filter-bar-wrapper">
                                           <Filterbar
                                             categoryFilter={this.handleCategoryChange.bind(this)}       
                                           />   
                                           {displaySearchBar}
                                           {displayResult}
                                         </div>
                                       </div>
                                       <footer>
                                         <h6> Copyright © CodeDammit 2016 </h6>
                                       </footer>

                                     </div>
                                   )
  }

}

SearchCode.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = SearchCode;

