import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Container as ReactstrapContainer, Row as ReactstrapRow, Col as ReactstrapCol } from 'reactstrap';

const propTypes = {
    /**
     * Defines the align-items style property. It's applied for all screen sizes.
     */
    alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
    /**
     * The content of the component.
     */
    children: PropTypes.node,
    /**
     * Useful to extend the style applied to components.
     */
    className: PropTypes.string,
    /**
     * If true, the component will have the flex container behavior. You should be wrapping items with a container.
     */
    container: PropTypes.bool,
    /**
     * Defines the flex-direction style property. It is applied for all screen sizes.
     */
    direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    /**
     * If true, the component will have the flex item behavior. You should be wrapping items with a container.
     */
    item: PropTypes.bool,
    /**
     * Defines the justify-content style property. It is applied for all screen sizes.
     */
    justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
    /**
     * Defines the number of grids the component is going to use. It's applied for the lg breakpoint and wider screens if not overridden.
     */
    lg: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'col-lg-auto']),
    /**
     * Defines the number of grids the component is going to use. It's applied for the md breakpoint and wider screens if not overridden.
     */
    md: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'col-md-auto']),
    /**
     * Defines the number of grids the component is going to use. It's applied for the sm breakpoint and wider screens if not overridden.
     */
    sm: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'col-sm-auto']),
    /**
     * Defines the flex-wrap style property. It's applied for all screen sizes.
     */
    wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
    /**
     * Defines the number of grids the component is going to use. It's applied for the xl breakpoint and wider screens.
     */
    xl: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'col-xl-auto']),
    /**
     * Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority.
     */
    xs: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'col-xs-auto']),
};

const defaultProps = {
    alignItems: 'stretch',
    item: false,
    justify: 'flex-start',
};


/**
 * Grid for base layouting
 * @extends Component
 */
export class Grid extends Component {
    /**
     * JustifyContent
     * @param {string} param attribute
     * @returns {string} bootstrap flex justify class
     */
    renderJustifyContent(param) {
        switch (param) {
            case 'flex-start':
                return 'd-flex justify-content-start';
            case 'center':
                return 'd-flex justify-content-center';
            case 'flex-end':
                return 'd-flex justify-content-end';
            case 'space-between':
                return 'd-flex justify-content-between';
            case 'space-around':
                return 'd-flex justify-content-around';
            default:
                return '';
        }
    }

    /**
     * AlignItems
     * @param {string} param attribute
     * @returns {string} bootstrap flex align class
     */
    renderAlignItems(param) {
        switch (param) {
            case 'flex-start':
                return 'align-items-start';
            case 'center':
                return 'align-items-center';
            case 'flex-end':
                return 'align-items-end';
            case 'stretch':
                return 'align-items-stretch';
            case 'baseline':
                return 'align-items-baseline';
            default:
                return '';
        }
    }

    /**
     * Direction
     * @param {string} param attribute
     * @returns {string} bootstrap flex direction class
     */
    renderDirection(param) {
        switch (param) {
            case 'row':
                return 'flex-row';
            case 'row-reverse':
                return 'flex-row-reverse';
            case 'column':
                return 'flex-column';
            case 'column-reverse':
                return 'flex-column-reverse';
            default:
                return '';
        }
    }

    /**
     * Wrap
     * @param {string} param attribute
     * @returns {string} bootstrap flex wrap class
     */
    renderWrap(param) {
        switch (param) {
            case 'wrap':
                return 'flex-wrap';
            case 'nowrap':
                return 'flex-nowrap';
            case 'wrap-reverse':
                return 'flex-wrap-reverse';
            default:
                return '';
        }
    }

    render() {
        const {
            alignItems,
            children,
            className,
            container,
            direction,
            item,
            xs,
            sm,
            md,
            lg,
            xl,
            justify,
            wrap,
            ...attributes
        } = this.props;

        let grid = '';

        if (item) {
            grid = (
                <ReactstrapCol
                    xs={xs}
                    sm={sm}
                    md={md}
                    lg={lg}
                    xl={xl}
                    className={classNames(className)}
                    {...attributes}
                >
                    { children }
                </ReactstrapCol>);
        } else {
            grid = (
                <ReactstrapContainer
                    fluid={container}
                    {...attributes}
                >
                    <ReactstrapRow
                        className={
                            classNames(
                                className,
                                this.renderJustifyContent(justify),
                                this.renderAlignItems(alignItems),
                                this.renderDirection(direction),
                                this.renderWrap(wrap)
                            )
                        }
                    >
                        { children }
                    </ReactstrapRow>
                </ReactstrapContainer>);
        }

        return (
            grid
        );
    }
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
