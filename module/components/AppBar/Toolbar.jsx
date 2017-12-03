import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * If true, disables gutter padding.
     */
    disableGutters: PropTypes.bool,
};

const defaultProps = {
    disableGutters: false,
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
            disableGutters,
        } = this.props;

        const materialClasses = 'toolbar' + (disableGutters ? ' no-gutters' : '');

        return (
            <div className={classNames(className, materialClasses)}>{children}</div>
        );
    }
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

export default Toolbar;
