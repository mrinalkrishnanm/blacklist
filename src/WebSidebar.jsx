import React from 'react';
import Router from 'react-router';
import Select from 'react-select';


class WebSidebar extends React.Component{
  constructor(){
    super()

  }

  handleLanguageFilter(e) {
    e.preventDefault();

    var option = e.target.getAttribute('data-language')
    var node = e.target.parentNode.parentNode.childNodes
    console.log(node)
    for(var i=0;i < node.length;i++){
      node[i].firstChild.style.color = '#3e4152'
    }
    e.target.style.color = '#db4860'
    this.props.languageFilter(e,option)


  }

  handleDifficultyFilter(e) {
    e.preventDefault();
    var option = e.target.getAttribute('data-difficulty')
    var node = e.target.parentNode.parentNode.childNodes
    console.log(node)
    for(var i=0;i < node.length;i++){
      node[i].firstChild.style.color = '#3e4152'
    }
    e.target.style.color = '#db4860'

    this.props.difficultyFilter(e,option)
  }

  render(){
    return(
      <div className='filter-option-container'> 
        <h3>Language</h3>
        <ul className='sidebar-options'>
          <li><button data-language = 'python' onClick={this.handleLanguageFilter.bind(this)} >Python</button></li>
          <li><button data-language = 'ruby' onClick={this.handleLanguageFilter.bind(this)} >Ruby</button></li>
          <li><button data-language = 'javascript' onClick={this.handleLanguageFilter.bind(this)} >Javascript</button></li>
          <li><button data-language = 'clojure' onClick={this.handleLanguageFilter.bind(this)} >Clojure</button></li>
          <li><button data-language = 'haskell' onClick={this.handleLanguageFilter.bind(this)} >Haskell</button></li>
          <li><button data-language = 'html' onClick={this.handleLanguageFilter.bind(this)} >HTML/CSS</button></li>
          <li><button data-language = "go" onClick={this.handleLanguageFilter.bind(this)} >Go</button></li>
          <li><button data-language = "php" onClick={this.handleLanguageFilter.bind(this)} >PHP</button></li>
          
        </ul>
        <h3>Difficulty</h3>
        <ul className='sidebar-options'>
          <li><button data-difficulty = 'easy' onClick={this.handleDifficultyFilter.bind(this)} >Easy</button></li>
          <li><button data-difficulty = 'medium' onClick={this.handleDifficultyFilter.bind(this)} >Medium</button></li>
          <li><button data-difficulty = 'hard' onClick={this.handleDifficultyFilter.bind(this)} >Hard</button></li>
        </ul>
      </div>
    )
  }
}


module.exports = WebSidebar;


