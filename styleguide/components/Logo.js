import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import logo from './logo.svg';

const styles = ({ fontFamily, color }) => ({});

export function LogoRenderer({ classes, children }) {
	return (
    <a className="navbar-brand mr-0 mr-md-2" href="/" aria-label="{children}">
       <img className="doc-logo" src={logo} />
			 {children}
    </a>
	);
}

LogoRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
