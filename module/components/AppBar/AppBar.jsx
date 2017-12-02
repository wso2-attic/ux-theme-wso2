import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Navbar as ReactstrapNavbar } from 'reactstrap';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object,
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
 * Extended button class
 * @extend {ReactComponent} ReactstrapButton
 */
export class AppBar extends Component {
    /**
     * Constructor
     * @param {object} props - Element properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const {
            classes,
            color,
            position,
            children,
            ...attributes
        } = this.props;
        
        const materialClasses = 'appbar navbar navbar-expand navbar-dark bg-primary';

        return (
            <ReactstrapNavbar
                className={
                    classNames(
                        classes,
                        materialClasses
                    )
                }
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
