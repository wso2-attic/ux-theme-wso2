import React from 'react';
import classNames from 'classnames';
import { Button as ReactstrapButton } from 'reactstrap';

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
               color
             } = this.props;
       
        const Component = component || 'button';
       
        let defaultClasses = '';
       
        return (
            <ReactstrapButton className={ classNames(classes, defaultClasses) } color={ color }>{ this.props.children }</ReactstrapButton>
        );
   }
}

export default Button;