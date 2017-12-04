import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CardHeader as ReactstrapCardHeader } from 'reactstrap';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * If true, the card will use raised styling.
     */
    action: PropTypes.node,
    /**
     * The action to display in the card header.
     */
    avatar: PropTypes.node,
    /**
     * The Avatar for the Card Header.
     */
    subheader: PropTypes.node,
    /**
     * The content of the component.
     */
    title: PropTypes.node,
    /**
     * The content of the Card Title.
     */
    children: PropTypes.node,
};

/**
 * Extended CardHeader class
 * @extend {ReactComponent} ReactstrapCardHeader
 */
export class CardHeader extends Component {
    /**
     * Render
     * @return {ReactElement} Component Markup
     */
    render() {
        const {
            className,
            children,
            avatar,
            subheader,
            title,
            ...attributes
        } = this.props;

        return (
            <ReactstrapCardHeader
                className={classNames(className)}
                avatar={avatar}
                subheader={subheader}
                title={title}
                {...attributes}
            >
                { children }
            </ReactstrapCardHeader>
        );
    }
}

CardHeader.propTypes = propTypes;

export default CardHeader;
