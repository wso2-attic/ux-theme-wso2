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
     * The alt will add alternate text for images.
     */
    alt: PropTypes.string,
    /**
     * Size will adjust the size of avatar
     */
    size: PropTypes.string,
};

const defaultProps = {
    color: 'primary',
    outline: false,
    className: '',
    labelText: '',
    src: '',
    alt: '',
    size: '50px',
};

/**
 * Default Avatar component.
 * @returns {Avatar} component.
 */
export class Avatar extends React.Component {
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
            size,
            ...attributes
        } = this.props;
        
        const materialClasses = 'avatar avatar-rounded' + ((color && !outline) ? ' bg-' + color : '') + ((outline) ? ' avatar-outline-' + color : '');
        
        var style = {
            height: size,
            width: size
        };

        return (
            <div
                className={classNames(className, materialClasses)}
                {...attributes}
                style={style}
            >
                {src ? ( <img src={src} alt={alt}/> ) : ( <span>{labelText}</span> ) }
            </div>
        );
    }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
