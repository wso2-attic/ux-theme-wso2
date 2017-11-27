import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge as ReactstrapBadge } from 'reactstrap';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.string,
    /**
     * The color of the component. It's using the theme palette when that makes sense.
     */
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger']),
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

export class Badge extends React.Component {
    render() {
        const {
            classes,
            color,
            pill,
            href,
        } = this.props;

        const materialClasses = [
            pill ? 'badge-pill' : false,
        ];

        return (
            <ReactstrapBadge
                className={classNames(classes, materialClasses)}
                color={color}
                href={href}
            >
                {this.props.children}
            </ReactstrapBadge>
        );
    }
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
