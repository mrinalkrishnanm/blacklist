"use strict";

import React from 'react';
import Router, {Link} from 'react-router';
import Request from 'superagent';
import _ from 'lodash';
import dynamics from 'dynamics.js'
class HomePage extends React.Component{

  constructor () {
    super()
  }

  handleClick(e) {
    e.preventDefault();
    var type = e.target.getAttribute('data-type')
    this.context.router.transitionTo('searchcode', null, {category: type})
  }
  componentDidMount() {
    var el = document.getElementsByClassName('container')[0]
    dynamics.animate(el, {
      translateY: 200,
      opacity: 1
    }, {
      type: dynamics.linear,
      duration: 800
    })
  }

  render () {
    return (
      <div id="homepage-wrapper">
        <div className="container">
          <Link to="app"><img src="img/logo2.png" /></Link>
          <a href="mailto:admin@codedammit.co"><h6 className="contact-us">Contact Us</h6></a>
          <h3>You can find all the <em>"codedamn"</em> code here.</h3>
          <button data-type="web" onClick={this.handleClick.bind(this)} className="search web"> Web </button>
          <button data-type="mobile"  onClick={this.handleClick.bind(this)} className="search mobile"> Mobile </button>
          <button data-type="snippet" onClick={this.handleClick.bind(this)} className="search snippet"> Snippets </button>
        </div>
        <footer>
          <h1> Help us by contributing GitHub codes! </h1>
          <h6> Copyright © CodeDammit 2016 </h6>
        </footer>
      </div>
    );
  }
}

  HomePage.contextTypes = {
    router: React.PropTypes.func.isRequired
  }


  module.exports = HomePage;
