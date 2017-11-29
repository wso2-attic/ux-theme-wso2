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
     * The labelText of the component. It's using the theme palette when that makes sense.
     */
    labelText: PropTypes.string,
    /**
     * The src of the component. It's using the theme palette when that makes sense.
     */
    src: PropTypes.string,
    /**
     * If `true`, the Avatar will use outline styling.
     */
    outline: PropTypes.bool,
    /**
     * If `true`, the Avatar will use outline styling.
     */
    alt: PropTypes.string,
};

const defaultProps = {
    color: 'primary',
    outline: false,
    className: 'avatar',
    labelText: '',
    src: '',
    alt: '',
};

/**
 * Default Avatar component.
 * @returns {Avatar} component.
 */
class Avatar extends React.Component {
    /**
     * render method for Avatar
     */
    render() {
        const {
            className,
            color,
            src,
            labelText,
            alt,
            outline,
            ...attributes
        } = this.props;
        const materialClasses = 'avatar avatar-rounded' + ((color) ? ' bg-' + color : '') + ((outline) ? ' avatar-outline-' + color : '');

        return (
            <div
                className={classNames(className, materialClasses)}
                {...attributes}
            >
                {src ? (<img src={src} alt={alt}/>) : (<span>{labelText}</span>) }
            </div>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
