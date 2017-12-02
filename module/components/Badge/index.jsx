import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge as ReactstrapBadge } from 'reactstrap';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * The color of the component. It's using the theme palette when that makes sense.
     */
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
    /**
     * Adding the href prop will default the badge to a link
     */
    href: PropTypes.string,
    /**
     * If `true`, pill style will be added.
     */
    pill: PropTypes.bool,
    /**
     * @ignore
     */
    children: PropTypes.node,
};

const defaultProps = {
    pill: false,
    color: 'primary',
};

/**
 * Extended badge component
 * @extend {ReactComponent} ReactstrapBadge
 */
export class Badge extends Component {
    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const {
            className,
            color,
            pill,
            href,
            ...attributes
        } = this.props;

        const materialClasses = [
            pill ? 'badge-pill' : false,
        ];

        return (
            <ReactstrapBadge
                className={classNames(className, materialClasses)}
                color={color}
                href={href}
                {...attributes}
            >
                {this.props.children}
            </ReactstrapBadge>
        );
    }
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
