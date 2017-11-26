import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
	/*
	 * Used to extend default object classes
	 */
	classes : PropTypes.object,
	/*
	 * Click event handler
	 */
	onClick : PropTypes.func,
	/*
	 * Delete event handler
	 */
	onRequestDelete : PropTypes.func,
	/*
	 * This property will contain label text
	 */
	label : PropTypes.string,
	/*
	 * This property will contain label styling
	 */
	labelStyle : PropTypes.object
}

class Chip extends React.Component{

	constructor(props){
		super(props);
		this.onClick = this.onClick.bind(this);
		this.handleDeleteIconClick = this.handleDeleteIconClick.bind(this);
	}

	onClick(e) {
		if (this.props.onClick) {
		  this.props.onClick(e);
		}
	}

	handleDeleteIconClick(e){
	    e.stopPropagation();

	    if (this.props.onRequestDelete) {
	      this.props.onRequestDelete(event);
	    }
  	};

	render(){

		let defaultClasses = 'chips chips-rounded',
			defaultLabelClasses = 'chips-label',
			avatar = null,
			deleteIcon = '';

		const {
			classes,
			children: childrenProp,
			onClick,
			label,
			onRequestDelete,
			labelStyle,
		} = this.props;

		let children = childrenProp;
		const childrenCount = React.Children.count(children);

		if (childrenCount >= 1) {
	      children = React.Children.toArray(children);

	      if (React.isValidElement(children[0]) && children[0].type.name === 'Avatar') {
	        avatar = children.shift();
	        avatar = React.cloneElement(avatar);
	      }
	    }
		
		if(onRequestDelete){
			deleteIcon = (
				<div className="deleteIcon" onClick={this.handleDeleteIconClick} />
			);
		}

		return (
			<div className={classNames(classes, defaultClasses)} onClick={onClick} >
				{avatar}
		        <span className={classNames(labelStyle, defaultLabelClasses)}>{label}</span>
		        {deleteIcon}
	      	</div>
		)
	}

}

Chip.PropTypes = propTypes;

export default Chip;