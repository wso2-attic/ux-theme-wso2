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
                    <NavbarBrand href="/">Theme WSO2</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/wso2-dev-ux/theme-wso2" target="_blank">Github</NavLink>
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
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.
                    </p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}

render(<App />, document.getElementById('app'));
