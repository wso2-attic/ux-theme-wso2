import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    /**
     * Used to extend default object classes
     */
    className: PropTypes.object,
    /**
     * Click event handler
     */
    onClick: PropTypes.func,
    /**
     * Delete event handler
     */
    onRequestDelete: PropTypes.func,
    /**
     * This property will contain label text
     */
    label: PropTypes.string,
    /**
     * This property will contain label styling
     */
    labelStyle: PropTypes.object,
    /**
     * @ignore
     */
    onKeyDown: PropTypes.func,
    /**
     * @ignore
     */
    onKeyDownDelete: PropTypes.func,
};

class Chip extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.handleDeleteIconClick = this.handleDeleteIconClick.bind(this);
    }

    onClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    handleDeleteIconClick(e) {
        e.stopPropagation();

        if (this.props.onRequestDelete) {
            this.props.onRequestDelete(e);
        }
    }

    handleKeyDownForChip(e) {
        if (e.keyCode === 8) {
            e.preventDefault();
            if (this.props.onClick) {
                this.props.onClick(e);
            }
        }
        this.props.onKeyDown(e);
    }

    handleKeyDownForDelete(e) {
        if (e.keyCode === 8) {
            e.preventDefault();
            if (this.props.onRequestDelete) {
                this.props.onRequestDelete(e);
            }
        }
        this.props.onKeyDownDelete(e);
    }

    render() {
        let defaultClasses = 'chips chips-rounded';
        const defaultLabelClasses = 'chips-label';
        let avatar = null;
        let deleteIcon = '';

        const {
            className,
            children: childrenProp,
            onClick,
            label,
            onRequestDelete,
            labelStyle,
            onKeyDown,
            onKeyDownDelete,
            ...attributes
        } = this.props;

        let children = childrenProp;
        const childrenCount = React.Children.count(children);

        if (onClick) {
            defaultClasses += ' chip-clickable';
        }

        if (childrenCount >= 1) {
            children = React.Children.toArray(children);

            if (React.isValidElement(children[0]) && children[0].type.name === 'Avatar') {
                avatar = children.shift();
                avatar = React.cloneElement(avatar);
            }
        }

        if (onRequestDelete) {
            deleteIcon = (
                <div className="deleteIcon" onKeyDown={this.handleKeyDownForDelete} onClick={this.handleDeleteIconClick} />
            );
        }

        return (
            <div className={classNames(className, defaultClasses)} onKeyDown={this.handleKeyDownForChip} onClick={this.onClick} {...attributes}>
                {avatar}
                <span className={classNames(labelStyle, defaultLabelClasses)}>{label}</span>
                {deleteIcon}
            </div>
        );
    }
}

Chip.PropTypes = propTypes;
export default Chip;
