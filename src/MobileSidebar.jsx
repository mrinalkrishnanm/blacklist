import React from 'react';
import Router from 'react-router';
import Select from 'react-select';


class MobileSidebar extends React.Component{
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
        <h3>Platform</h3>
        <ul className='sidebar-options'>
          <li><button data-language = 'android'  onClick={this.handleLanguageFilter.bind(this)}>Android</button></li>
          <li><button data-language = 'ios'  onClick={this.handleLanguageFilter.bind(this)}>IOS</button></li>
          <li><button data-language = 'native' onClick={this.handleLanguageFilter.bind(this)}>React Native</button></li>
        </ul>
        <h3>Difficulty</h3>        
        <ul className='sidebar-options'>
          <li><button data-difficulty='easy' onClick={this.handleDifficultyFilter.bind(this)}>Easy</button></li>
          <li><button data-difficulty='medium' onClick={this.handleDifficultyFilter.bind(this)}>Medium</button></li>
          <li><button data-difficulty='hard' onClick={this.handleDifficultyFilter.bind(this)}>Hard</button></li>
          </ul>
        </div>
        )
        }
        }


        module.exports = MobileSidebar;


