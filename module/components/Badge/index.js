import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Badge as ReactstrapBadge } from 'reactstrap';

const propTypes ={
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.string,
    /**
     * The color of the component. It's using the theme palette when that makes sense.
     */
    color: PropTypes.string,
    /**
     * Adding the href prop will default the badge to a link
     */
    href: PropTypes.string
};

const defaultProps = {
    href: '#',
};

export class Badge extends React.Component{


    render(){

        const { classes,
                color,
                href
        } = this.props;

        let materialClasses = '';

        return(
            <ReactstrapBadge className={ classNames(classes, materialClasses) } color={ color } href={ href } >
                { this.props.children }
            </ReactstrapBadge>
        );
    }

}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;