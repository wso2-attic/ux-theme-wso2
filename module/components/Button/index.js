import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
 * Default button
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

        const parent = ReactDOM.findDOMNode(this);
        const ripple = ReactDOM.findDOMNode(this.refs.ripple);

        parent.classList.remove('btn-animate');

        const d = Math.max(parent.offsetWidth, parent.offsetHeight);

        ripple.style.height = d + 'px';
        ripple.style.width = d + 'px';

        ripple.style.left = 0;
        ripple.style.top = 0;

        parent.classList.add('btn-animate');

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
            raised ? 'raised' : false,
            dense ? 'dense' : false,
        ];

        return (
            <ReactstrapButton
                className={classNames(className, materialClasses)}
                color={color}
                outline={outline}
                disabled={disabled}
                size={size}
                onClick={(e) => this.handleClick(e)}
                {...attributes}
            >
                { children }
                <div ref="ripple" className="ripple" />
            </ReactstrapButton>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
