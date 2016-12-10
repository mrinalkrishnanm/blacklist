import React from 'react';
import Router from 'react-router';
import Request from 'superagent';
import CodeResultBox from './CodeResultBox.jsx'

class CodeResultList extends React.Component{
	constructor(){
		super()
	}

  handleInfinite(e) {
    console.log()
    if (window.scrollTop == document.innerHeight - window.innerHeight)
        {
          console.log("Bottom reached")
        }
  }
	render(){
		var codes = this.props.codes
		console.log(codes)
		var display = codes.map(function(code) {
			return <CodeResultBox key={code.id} code={code} />
		})
		return(
			<div onScroll={this.handleInfinite.bind(this)} className="code-result-list">
        <h3> <b>{codes.length}</b> CODES FOUND </h3>
               { display }
			</div>
			)
	}	
}

module.exports = CodeResultList;
