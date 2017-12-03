import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * Children passed into the paper element.
     */
    children: PropTypes.node,
    /**
     * Set to true to generate a circular paper container.
     */
    circle: PropTypes.bool,
    /**
     * Set the paper width.
     */
    width: PropTypes.string,
    /**
     * Set the paper height.
     */
    height: PropTypes.string,
};

const defaultProps = {
    circle: false,
    width: '100%',
};

/**
 Default paper class
 * @extend {ReactComponent} ReactstrapButton
 */
export class Paper extends Component {
    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const {
            className,
            children,
            circle,
            width,
            height,
            ...attributes
        } = this.props;

        const defaultClasses = circle? 'paper paper-circle' : 'paper';

        const style = {
            width: width,
            height: height,
        };

        return (
            <div
                className={classNames(className, defaultClasses)}
                circle={circle}
                {...attributes}
                style={style}
            >
                { children }
            </div>
        );
    }
}

Paper.propTypes = propTypes;
Paper.defaultProps = defaultProps;

export default Paper;
