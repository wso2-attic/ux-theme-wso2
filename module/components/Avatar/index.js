import React, {Component} from 'react';
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
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
    /**
     * The icon of the component. It's using the theme palette when that makes sense.
     */
    icon: PropTypes.element,
    /**
     * The src of the component. It's using the theme palette when that makes sense.
     */
    src: PropTypes.string,
    /**
     * The Size of the component. It's using the theme palette when that makes sense.
     */
    size: PropTypes.oneOf(['sm', 'lg', 'default']),
    /**
     * If `true`, the button will use outline styling.
     */
    outline: PropTypes.bool,
};

const defaultProps = {
    size: 'default',
    color: 'primary',
    outline: false
};

/**
 * Default Avatar
 */

class Avatar extends Component {
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

        let materialClasses = 'avatar avatar-rounded' + ((color) ? ' bg-' + color : '') ;

        return (
            <div className={classNames(classes, materialClasses)} >
            { this.props.children }
        {src ? (<img src={src} />) : (<span>{labelText}</span>) }
    </div>
    );
    }
}

Avatar.propTypes = propTypes;

export default Avatar;
