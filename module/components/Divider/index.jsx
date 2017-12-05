import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * If true, the divider will have a lighter color.
     */
    light: PropTypes.bool,
};

/**
 * Extended divider component.
 * @returns {Divider} component.
 */
export class Divider extends Component {
    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const {
            className,
            light,
        } = this.props;

        const materialClasses = 'divider' + ( light ? ' divider-light' : '');

        return (
            <hr
                className={materialClasses}
            />
        );
    }
}

Divider.propTypes = propTypes;

export default Divider;
