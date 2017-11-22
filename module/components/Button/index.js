import React from 'react';
import classNames from 'classnames';
import { Button as ReactstrapButton } from 'reactstrap';

export class Button extends React.Component {
   render () {
        const { classes,
               component,
               dense,
               disableFocusRipple,
               disableRipple,
               disabled,
               fab,
               href,
               raised 
             } = this.props;
       
        const Component = component || 'button';
       
        let defaultClasses = '';
       
        return (
            <ReactstrapButton className={ classNames(classes, defaultClasses) }>{ this.props.children }</ReactstrapButton>
        );
   }
}