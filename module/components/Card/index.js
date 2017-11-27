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
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     * The default value is a `button`.
     */
    component: PropTypes.element,
    /**
     * Uses a smaller minWidth, ideal for things like card actions.
     */
    dense: PropTypes.bool,
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     * `disableRipple` must also be true.
     */
    disableFocusRipple:  PropTypes.bool,
    /**
     * If `true`, the ripple effect will be disabled.
     */
    disableRipple: PropTypes.bool,
    /**
     * If `true`, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, will use floating action button styling.
     */
    fab: PropTypes.bool,
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
     */
    href: PropTypes.string,
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
};

const defaultProps = {
    size: '',
    outline: false,
    disabled: false,
    raised: false,
    dense: false
};

/**
 * Default button
 */
export class Button extends React.Component {
   constructor(props) {
        super(props);
   }
    
   render () {
        const { classes,
               component,
               dense,
               disableFocusRipple,
               disableRipple,
               disabled,
               fab,
               href,
               raised,
               color,
               outline,
               size
             } = this.props;
       
        let materialClasses = [
                                raised ? `raised` : false ,
                                dense ? `dense` : false,
                                ];

        return (
            <ReactstrapButton className={ classNames(classes, materialClasses) } color={ color } outline={ outline }
                              disabled={ disabled } size={ size }>{ this.props.children }</ReactstrapButton>
        );
   }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;