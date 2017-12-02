import React from 'react';
import classNames from 'classnames';

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { className, text, link, children } = this.props;
        
        return (
            <div>{children}</div>
        );
    }
    
}

export default Toolbar;