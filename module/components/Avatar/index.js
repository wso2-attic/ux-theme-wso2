import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
     * The icon of the component. It's using the theme palette when that makes sense.
     */
    src: PropTypes.string,
    /**
     * If `true`, the button will use outline styling.
     */
    outline: PropTypes.bool,
};

const defaultProps = {
    color: 'primary',
    outline: false
};

/**
 * Default Avatar
 */

class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {
            className,
            color,
            src,
            labelText,
            ...attributes
        } = this.props;

        let materialClasses = 'avatar avatar-rounded' + ((color) ? ' bg-' + color : '');

        return (
            <div className={classNames(className, materialClasses)} {...attributes}>
                {src ? (<img src={src}/>) : (<span>{labelText}</span>) }
            </div>
        );
    }
}

Avatar.propTypes = propTypes;

export default Avatar;