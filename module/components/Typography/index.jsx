import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    /**
     * Alignment of the text
     */
    align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * Applies the theme typography styles.
     */
    type: PropTypes.oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2',
        'body1', 'caption', 'button']),
};

const defaultProps = {
    align: 'inherit',
    type: 'body1',
};

/**
 * Typography component
 * @extend {Component}
 */
export class Typography extends Component {
    typeMapping(param){
        switch (param) {
            case 'display1':
                return 'display-1';
            case 'display2':
                return 'display-2';
            case 'display3':
                return 'display-3';
            case 'display4':
                return 'display-4';
            default:
                return '';
        }
    }

    /**
     * Render
     * @returns {ReactElement} Component Markup
     */
    render() {
        const {
            className,
            type,
            ...other
        } = this.props;

        const Components = 'span';

        return (
            <Components
                className={classNames(className, this.typeMapping(type))}
                type={type}
                {...other}
            />
        );
    };
}

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;

export default Typography;