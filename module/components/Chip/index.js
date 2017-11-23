import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
	classes: PropTypes.object,
	backgroundColor: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func,
}

const defaultProps = {
	backgroundColor : 'chips-gray' 
}

export default class Chip extends React.Component {
	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	handleClickEvent(key){
		alert(key);
	};

	onClick(e) {
		handleClickEvent(e);
	    /*if (this.props.disabled) {
	      e.preventDefault();
	      return;
	    }

	    if (this.props.onClick) {
	      	this.props.onClick(e);
    	}*/
  	}

	render(){

		let {
	      classes,
	      backgroundColor,
	      text,
	      onClick,
	    } = this.props;

	    let defaultClasses = 'chips chips-rounded';

		return (
			<div className={classNames(classes, defaultClasses)} onClick={this.onClick}>
				<span>{this.props.text}</span>
			</div>
		)
	}

}

Chip.propTypes = propTypes;
Chip.defaultProps = defaultProps;