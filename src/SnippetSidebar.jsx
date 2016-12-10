import React from 'react';
import Router from 'react-router';
import Select from 'react-select';


class SnippetSidebar extends React.Component{
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
          <li><button data-language = 'ruby' onClick={this.handleLanguageFilter.bind(this)}  >Ruby</button></li>
          <li><button data-language = 'java' onClick={this.handleLanguageFilter.bind(this)} >Java</button></li>
          <li><button data-language = 'javascript' onClick={this.handleLanguageFilter.bind(this)} >Javascript</button></li>
          <li><button data-language = 'c' onClick={this.handleLanguageFilter.bind(this)} >C</button></li>
          <li><button data-language = 'c++' onClick={this.handleLanguageFilter.bind(this)} >C++</button></li>
          <li><button data-language = 'c#' onClick={this.handleLanguageFilter.bind(this)} >C#</button></li>
          <li><button data-language = 'clojure' onClick={this.handleLanguageFilter.bind(this)} >Clojure</button></li>
          <li><button data-language = 'haskell' onClick={this.handleLanguageFilter.bind(this)} >Haskell</button></li>
          <li><button data-language = 'html' onClick={this.handleLanguageFilter.bind(this)} >HTML/CSS</button></li>
        </ul>
        <h3>Difficulty</h3>

        <ul className='sidebar-options'>
          <li data-difficulty = 'easy' ><button data-difficulty = 'easy' onClick={this.handleDifficultyFilter.bind(this)} >Easy</button></li>
          <li data-difficulty = 'medium'><button data-difficulty = 'medium' onClick={this.handleDifficultyFilter.bind(this)} >Medium</button></li>
          <li data-difficulty = 'hard' ><button data-difficulty = 'hard' onClick={this.handleDifficultyFilter.bind(this)} >Hard</button></li>
        </ul>
      </div>
    )
  }
}


module.exports = SnippetSidebar;


