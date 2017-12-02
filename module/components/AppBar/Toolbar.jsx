import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * The content of the component.
     */
    children: PropTypes.node,
};

/**
 * Extended toolbar class
 * @extend {ReactComponent} ReactstrapButton
 */
class Toolbar extends Component {
    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const {
            className,
            children,
        } = this.props;

        return (
            <div className={className}>{children}</div>
        );
    }
}

Toolbar.propTypes = propTypes;

export default Toolbar;
