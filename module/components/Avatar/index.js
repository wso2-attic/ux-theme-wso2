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
    // /**
    //  * The size of the component. It's using the theme palette when that makes sense.
    //  */
    // size: PropTypes.number,
    /**
     * The src of the component. It's using the theme palette when that makes sense.
     */
    src: PropTypes.string,
    /**
     * Supports for large or small button
     */
    size: PropTypes.oneOf(['sm','md', 'lg']),
};

const defaultProps = {
    size: 'sm',
    backgroundColor: '#95a5a6',
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
            size,
            labelText,
            svg
        } = this.props;


        let defaultClasses = 'avatar avatar-rounded';

        return (
            <div className={classNames(classes, defaultClasses)} color={ color } icon={icon} size={size}>
                { this.props.children }
                {src ? (<img src={src} />) : (<span>{labelText}</span>) }
            </div>
        );
    }
}

Avatar.propTypes = propTypes;

export default Avatar;