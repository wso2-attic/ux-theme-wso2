import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as ReactstrapButton } from 'reactstrap';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * Uses a smaller minWidth, ideal for things like card actions.
     */
    dense: PropTypes.bool,
    /**
     * If `true`, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the button will use raised styling.
     */
    raised: PropTypes.bool,
    /**
     * The color of the component. It's using the theme palette when that makes sense.
     */
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
    /**
     * If `true`, the button will use outline styling.
     */
    outline: PropTypes.bool,
    /**
     * Supports for large or small button
     */
    size: PropTypes.oneOf(['sm', 'lg', 'default']),
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * Click event handler
     */
    onClick: PropTypes.func,
};

const defaultProps = {
    size: 'default',
    color: 'primary',
    outline: false,
    disabled: false,
    raised: false,
    dense: false,
};

/**
 * Extended button class
 * @extend {ReactComponent} ReactstrapButton
 */
export class Button extends Component {
    /**
     * Constructor
     * @param {object} props - Element properties
     */
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Handle button click event
     * @param {SytheticEvent} e - Click event
     */
    handleClick(e) {
        e.preventDefault();

        /**
        * Get element position
        * @param {object} elem button DOM element
        * @return {object} top,left
        */
        function getCoords(elem) { // crossbrowser version
            const box = elem.getBoundingClientRect();

            const { body, documentElement } = document;

            const scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop;
            const scrollLeft = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft;

            const clientTop = documentElement.clientTop || body.clientTop || 0;
            const clientLeft = documentElement.clientLeft || body.clientLeft || 0;

            const top = box.top + scrollTop - clientTop;
            const left = box.left + scrollLeft - clientLeft;

            return { top: Math.round(top), left: Math.round(left) };
        }

        const { ripple } = this;
        const button = ripple.parentElement;

        button.classList.remove('btn-animate');

        const rippleSize = Math.max(button.offsetHeight, button.offsetWidth);
        const rippleCenter = rippleSize / 2;

        ripple.style.height = rippleSize + 'px';
        ripple.style.width = rippleSize + 'px';

        ripple.style.left = e.nativeEvent.pageX - getCoords(button).left - rippleCenter + 'px';
        ripple.style.top = e.nativeEvent.pageY - getCoords(button).top - rippleCenter + 'px';

        button.classList.add('btn-animate');

        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const {
            className,
            dense,
            disabled,
            raised,
            color,
            outline,
            size,
            onClick,
            children,
            ...attributes
        } = this.props;

        const materialClasses = [
            raised ? 'btn-raised' : false,
            dense ? 'btn-dense' : false,
        ];

        const rippleCssClasses = 'btn-ripple btn-ripple-' + color;

        return (
            <ReactstrapButton
                className={classNames(className, materialClasses)}
                color={color}
                outline={outline}
                disabled={disabled}
                size={size}
                onClick={(e) => { this.handleClick(e); }}
                {...attributes}
            >
                {children}
                <div ref={(ref) => { this.ripple = ref; }} className={rippleCssClasses} />
            </ReactstrapButton>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
