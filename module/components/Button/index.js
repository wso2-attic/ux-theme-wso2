import React from 'react';
import { Button as ReactstrapButton } from 'reactstrap';

export class Button extends React.Component {
   render () {
       return (
          <ReactstrapButton color="primary" size="lg">{ this.props.children }</ReactstrapButton>
       );
   }
}