import pkg from '../package.json';
import React from 'react';
import { render } from 'react-dom';
import { Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    Jumbotron, Button, Breadcrumb, BreadcrumbItem } from 'theme-wso2';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand>
                    <NavbarToggler onClick={this.toggle} />
                    <NavbarBrand href="/">{ pkg["display-name"] } <span className="text-muted">v{ pkg.version }</span></NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="{ pkg.repository.url }" target="_blank">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#">Library</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="#">Data</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Bootstrap</BreadcrumbItem>
                </Breadcrumb>
                <Jumbotron>
                    <h1 className="display-3">Hello, world!</h1>
                    <p className="lead">{ pkg["display-name"] } is a framework which has collection of reusable React components that use to to develope WSO2 products stack.</p>
                    <hr className="my-2" />
                    <p>This is not limited to WSO2, but we welcome anyone to use it on their projects.
                    </p>
                    <p className="lead">
                        <Button className="fab">Learn More</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
