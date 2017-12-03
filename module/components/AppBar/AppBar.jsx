import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Navbar as ReactstrapNavbar } from 'reactstrap';

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
     * The color of the component. It's using the theme palette.
     */
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'default']),
    /**
     * The positioning type.
     */
    position: PropTypes.oneOf(['static', 'fixed', 'absolute']),
};

const defaultProps = {
    color: 'primary',
    position: 'fixed',
};

/**
 * Extended appbar class
 * @extend {ReactComponent} ReactstrapButton
 */
export class AppBar extends Component {
    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const {
            className,
            color,
            position,
            children,
            ...attributes
        } = this.props;

        const materialClasses = 'appbar navbar navbar-expand navbar-dark bg-primary';

        return (
            <ReactstrapNavbar
                className={classNames(className, materialClasses)}
                color={color}
                fixed={position}
                {...attributes}
            >
                {children}
            </ReactstrapNavbar>
        );
    }
}

AppBar.propTypes = propTypes;
AppBar.defaultProps = defaultProps;

export default AppBar;
