import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as ReactstrapButton } from 'reactstrap';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.Object,
    /**
     * The color of the component. It's using the theme palette when that makes sense.
     */
    color: PropTypes.string,
};

/**
 * Default button
 */
export default class Button extends React.Component {
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
       
        const Component = component || 'button';
       
        let defaultClasses = '';
       
        return (
            <ReactstrapButton className={ classNames(classes, defaultClasses) } color={ color } outline={ outline } size={ size }>{ this.props.children }</ReactstrapButton>
        );
   }
}

Button.propTypes = propTypes;