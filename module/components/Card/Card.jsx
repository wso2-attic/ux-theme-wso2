import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card as ReactstrapCard } from 'reactstrap';

const propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * If true, the card will use raised styling.
     */
    raised: PropTypes.bool,
    /**
     * @ignore
     */
    children: PropTypes.node,
};

const defaultProps = {
    raised: false,
};
/**
 * Card component class
 * @returns Card
 */
export class Card extends Component {
    render() {
        const {
            className,
            children,
            raised,
            ...attributes
        } = this.props;

        const materialClasses = [
            raised ? 'card-raised' : false,
        ];

        return (
            <ReactstrapCard
                className={classNames(className, materialClasses)}
                {...attributes}
            >
                { children }
            </ReactstrapCard>
        );
    }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
