import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
	classes: PropTypes.object,
	backgroundColor: PropTypes.string,
	labelText: PropTypes.string,
	onClick: PropTypes.func,
}

export default class Chip extends React.Component {
	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
	    if (this.props.disabled) {
	      e.preventDefault();
	      return;
	    }

	    if (this.props.onClick) {
	      	this.props.onClick(e);
    	}

  	}

	render(){

		let {
	      classes,
	      backgroundColor,
	      labelText,
	      onClick,
	    } = this.props;

	    let defaultClasses = 'chips chips-rounded';

		return (
			<div className={classNames(classes, defaultClasses)} onClick={ this.onClick }>
				<span>{this.props.labelText}</span>
			</div>
		)
	}

}

Chip.propTypes = propTypes;