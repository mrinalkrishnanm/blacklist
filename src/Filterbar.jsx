import React from 'react';
import Router from 'react-router';
import Select from 'react-select';
import dynamics from 'dynamics.js'

class Filterbar extends React.Component{
  constructor(){
    super()

  }

  filterCategory(e){
    e.preventDefault();
    var category = e.target.getAttribute('data-filter-type')
    var el = e.target
    var parent = el.parentNode.parentNode
    var li = parent.childNodes
    for(var i=0;i < li.length ;i++) {
      li[i].style.borderBottom = ''
    }
    el.parentNode.style.borderBottom = '2px solid #db4860'
    this.props.categoryFilter(e,category)
  }

  render(){
    return(
      <div className='filter-bar'>
        <ul className="filter-section">
          <li data-filter-type="web" onClick={this.filterCategory.bind(this)}><button data-filter-type="web">WEB</button></li>
          <li data-filter-type="mobile" onClick={this.filterCategory.bind(this)}><button data-filter-type="mobile">MOBILE</button></li>
          <li data-filter-type="snippet" onClick={this.filterCategory.bind(this)}><button data-filter-type="snippet">SNIPPETS</button></li>
        </ul>
      </div>
    )
  }
}


module.exports = Filterbar;

// SEarchcode has a function
// WE want this function to be accessed in another component ( Filterbar)
// But this is not possible since they're two different components.
// So, we assign this function as a props (filter) of filterbar component.
// Now this function can be accessed in the filterbar component by this.props.filter()
