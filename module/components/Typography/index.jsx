import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    /**
     * Alignment of the text
     */
    align: PropTypes.string,
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
};

const defaultProps = {
    align: 'inherit',
};

/**
 * Typography component
 * @extend {Component}
 */
export class Typography extends Component{

    render() {
        const {
            className,
            ...attributes
        } = this.props;

        const Component = 'span';

        return(
            <Component className={className} {...attributes} />
        );
    };
}

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;