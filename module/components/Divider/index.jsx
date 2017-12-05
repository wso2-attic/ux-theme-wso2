import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
};

/**
 * Default Divider component.
 * @returns {Divider} component.
 */
export class Divider extends Component {
    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const defaultClasses = 'hr';
        const {
            className,
        } = this.props;
        return (
            <hr className={defaultClasses} />
        );
    }
}

Divider.propTypes = propTypes;

export default Divider;

