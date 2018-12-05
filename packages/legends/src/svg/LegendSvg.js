/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import LegendSvgItem from './LegendSvgItem'
import { datumPropType, symbolPropTypes, interactivityPropTypes } from '../props'
import { computeDimensions } from '../compute'
import { Direction } from '../definitions'

const LegendSvg = ({
    data,

    // position/layout
    x,
    y,
    direction,
    padding: _padding,
    justify,
    effects,

    itemWidth,
    itemHeight,
    itemDirection,
    itemsSpacing,
    itemTextColor,
    itemBackground,
    itemOpacity,

    symbolShape,
    symbolSize,
    symbolSpacing,
    symbolBorderWidth,
    symbolBorderColor,

    onClick,
    onMouseEnter,
    onMouseLeave,

    theme,
}) => {
    // eslint-disable-next-line no-unused-vars
    const { width, height, padding } = computeDimensions({
        itemCount: data.length,
        itemWidth,
        itemHeight,
        itemsSpacing,
        direction,
        padding: _padding,
    })

    let xStep = 0
    let yStep = 0
    if (direction === Direction.Row) {
        xStep = itemWidth + itemsSpacing
    } else if (direction === Direction.Column) {
        yStep = itemHeight + itemsSpacing
    }

    return (
        <g transform={`translate(${x},${y})`}>
            {data.map((data, i) => (
                <LegendSvgItem
                    key={i}
                    data={data}
                    x={i * xStep + padding.left}
                    y={i * yStep + padding.top}
                    width={itemWidth}
                    height={itemHeight}
                    direction={itemDirection}
                    justify={justify}
                    effects={effects}
                    textColor={itemTextColor}
                    background={itemBackground}
                    opacity={itemOpacity}
                    symbolShape={symbolShape}
                    symbolSize={symbolSize}
                    symbolSpacing={symbolSpacing}
                    symbolBorderWidth={symbolBorderWidth}
                    symbolBorderColor={symbolBorderColor}
                    onClick={onClick}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    theme={theme}
                />
            ))}
        </g>
    )
}

LegendSvg.propTypes = {
    data: PropTypes.arrayOf(datumPropType).isRequired,

    // position/layout
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    direction: PropTypes.oneOf([Direction.Row, Direction.Column]).isRequired,
    padding: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
    ]).isRequired,
    justify: PropTypes.bool.isRequired,

    // items
    itemsSpacing: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemDirection: PropTypes.oneOf([
        Direction.LeftToRight,
        Direction.RightToLeft,
        Direction.TopToBottom,
        Direction.BottomToTop,
    ]).isRequired,
    itemTextColor: PropTypes.string.isRequired,
    itemBackground: PropTypes.string.isRequired,
    itemOpacity: PropTypes.number.isRequired,

    ...symbolPropTypes,
    ...interactivityPropTypes,
}

LegendSvg.defaultProps = {
    // position/layout
    padding: 0,
    justify: false,

    // items
    itemsSpacing: 0,
    itemDirection: Direction.LeftToRight,
    itemTextColor: 'black',
    itemBackground: 'transparent',
    itemOpacity: 1,
}

export default LegendSvg