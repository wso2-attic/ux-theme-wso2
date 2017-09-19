import React from 'react';
import {render} from 'react-dom';
import { Button } from 'reactstrap';

class App extends React.Component {
    
    constructor(){
        super();
    }
    
    render() {
        return (
            <Button color="danger">Danger!</Button>
        );
    }
}

render(<App/>, document.getElementById('app'));