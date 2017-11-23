import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.string,
    /**
     * The backgroundColor of the component. It's using the theme palette when that makes sense.
     */
    backgroundColor: PropTypes.string,
    /**
     * The children of the component. It's using the theme palette when that makes sense.
     */
    children: PropTypes.node,
    /**
     * The color of the component. It's using the theme palette when that makes sense.
     */
    color: PropTypes.string,
    /**
     * The icon of the component. It's using the theme palette when that makes sense.
     */
    icon: PropTypes.element,
    /**
     * The size of the component. It's using the theme palette when that makes sense.
     */
    size: PropTypes.number,
    /**
     * The src of the component. It's using the theme palette when that makes sense.
     */
    src: PropTypes.string,
    /**
     * The styles of the component. It's using the theme palette when that makes sense.
     */
    style: PropTypes.object,
};

/**
 * Default Avatar
 */
class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let { backgroundColor,
            children,
            classes,
            color,
            icon,
            src,
            style,
            size
        } = this.props;

        let defaultClasses = 'avatar avatar-rounded';

        return (
            <div className={ classNames(classes, defaultClasses) } >{ icon }</div>
        );
    }
}

Avatar.propTypes = propTypes;

export default Avatar;