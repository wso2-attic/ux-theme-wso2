import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
}

/**
 * Default Avatar component.
 * @returns {Avatar} component.
 */
export class Divider extends Component {
    /**
     * render method for Avatar
     */
    render() {
        let defaultClasses = 'hr';
        const {
            className
        } = this.props;
        return (
                <hr className={defaultClasses} />
        );
    }
}

Divider.propTypes = propTypes;

export default Divider;

