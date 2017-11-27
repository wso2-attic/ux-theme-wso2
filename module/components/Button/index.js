import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as ReactstrapButton } from 'reactstrap';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.string,
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
    color: PropTypes.string,
    /**
     * If `true`, the button will use outline styling.
     */
    outline: PropTypes.bool,
    /**
     * Supports for large or small button
     */
    size: PropTypes.oneOf(['sm', 'lg', '']),
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
    size: '',
    color: 'default',
    outline: false,
    disabled: false,
    raised: false,
    dense: false,
};

/**
 * Default button
 */
export class Button extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        const {
            classes,
            dense,
            disabled,
            raised,
            color,
            outline,
            size,
            onClick,
        } = this.props;

        const materialClasses = [
            raised ? 'raised' : false,
            dense ? 'dense' : false,
        ];

        return (
            <ReactstrapButton
                className={classNames(classes, materialClasses)}
                color={color}
                outline={outline}
                disabled={disabled}
                size={size}
                onClick={onClick}
            >
                { this.props.children }
            </ReactstrapButton>
        );
    }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
