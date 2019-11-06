import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	FC,
	//createClass,
	findTypes,
	omitProps,
	StandardProps,
	FixDefaults,
} from '../../util/component-types';
import * as chartConstants from '../../constants/charts';

import Point from '../Point/Point';
import Line from '../Line/Line';

const cx = lucidClassNames.bind('&-Legend');

const POINT_SIZE = 12;
const LINE_WIDTH = 22;

const { number, string, oneOf, bool, func } = PropTypes;

export interface ILegendProps extends StandardProps {
	/** Determines if the legend is vertical or horizontal */
	orient?: string;

	/** Determines if the legend has points */
	hasPoint?: boolean;

	/** Determines if the legend has borders */
	hasBorders?: boolean;

	/** Determines the kind of point  */
	pointKind?: string;

	/** Determines if the legend has lines */
	hasLine?: boolean;

	/** Determines if the sort order of legend items is reversed or not */
	isReversed?: boolean;

	/** Strings should match an existing color class unless they start with a '#'
		for specific colors. E.g.:

		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\`
	 */
	color?: string;
}

const defaultProps = {
	orient: 'vertical',
	hasBorders: true,
	hasPoint: true,
	pointKind: '',
	hasLine: true,
	isReversed: false,
	color: chartConstants.COLOR_0,
};

export interface ILegendProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
	> {
		/** Custom Item element (alias for `Legend.Item`) */
		Item?: React.ReactNode;
}

export interface ILegendFC extends FC<ILegendProps> {
	Item: FC<ILegendProps>;

		/** Called when the user clicks the \`Item\`. */
		onClick?: ({
			index,
			event,
			props,
		}: {
			index: any;
			event: React.MouseEvent<HTMLLegendElement>;
			props: ILegendProps;
		}) => void;
}

//const Legend = createClass({
export const Legend: FC<ILegendProps> = (props): React.ReactElement => {
	const {
		orient,
		hasBorders,
		hasPoint,
		pointKind,
		hasLine,
		isReversed,
		color,
		style,
		...passThroughs
	} = props as FixDefaults<ILegendProps, typeof defaultProps>;

	const handleItemClick = (index: any, props: ILegendProps, event: React.MouseEvent<HTMLButtonElement>): void {
		if (!props.onClick) {
			return void;
		}

		props.onClick(index, { props, event });
	}


	const isHorizontal = orient === 'horizontal';
	const isVertical = orient === 'vertical';
	const itemProps = _.map(findTypes(this.props, Legend.Item), 'props');
	const hasSomeLines =
		isVertical && _.some(itemProps, ({ hasLine }) => hasLine);

	return (
		<ul
			{...omitProps(passThroughs, Legend)}
			className={cx(className, '&', {
				'&-is-horizontal': isHorizontal,
				'&-is-vertical': isVertical,
				'&-has-borders': hasBorders,
				'&-is-reversed': isReversed,
			})}
		>
			{_.map(
				itemProps,
				(
					{
						hasLine,
						hasPoint,
						pointKind = 1,
						color,
						onClick,
						children,
						className: itemClass,
					},
					index
				) => (
					<li
						key={index}
						className={cx(itemClass, '&-Item')}
						//onClick={_.partial(this.handleItemClick, index, itemProps[index])}
						onClick={_.partial(this.handleItemClick, index, itemProps[index])}
					>
						{hasPoint || hasLine ? (
							<svg
								className={cx('&-Item-indicator')}
								width={hasLine || hasSomeLines ? LINE_WIDTH : POINT_SIZE}
								height={POINT_SIZE}
							>
								{hasPoint ? (
									<Point
										x={
											hasLine || hasSomeLines ? LINE_WIDTH / 2 : POINT_SIZE / 2
										}
										y={POINT_SIZE / 2}
										color={color}
										kind={pointKind}
									/>
								) : null}
								{hasLine ? (
									<Line
										d={`M0,${POINT_SIZE / 2} L${LINE_WIDTH},${POINT_SIZE / 2}`}
										color={color}
									/>
								) : null}
							</svg>
						) : null}
						{children}
					</li>
				)
			)}
		</ul>
	);
};

Legend.Item = LegendItem;

Legend.defaultProps = defaultProps;

Legend.displayName = 'Legend';

Legend.peek = {
	description: `
			Contrary to the other chart primitives, this component is not rendered
			in svg. In order to sanely render horizontal legends, we need to know
			the width of the text elements ahead of rendering time. Since we're
			using a variable width font, the only way I know of to correctly get
			the width is with the DOM function \`getComputedTextLength\`. Variable
			widths are much more easy to implement outside of svg.
		`,
	categories: ['visualizations', 'chart primitives'],
};
//TODO: Extend the fuctional component for this Height case
//Legend.HEIGHT = 28; // exposed for consumer convenience

Legend.propTypes = {
	className: string`
		Appended to the component-specific class names set on the root element.
	`,
	orient: oneOf(['horizontal', 'vertical'])`
		Determine orientation of the legend.
	`,
	hasBorders: bool`
		Show the legend borders. Turn this off if you want to put the legend in a
		\`ToolTip\` for example.
	`,
	isReversed: bool`
		Reverse the order of items in the legend.
	`,
};

Item.displayName = 'Legend.Item';
Item.peek = {
	description: `
					Renders a \`<li>\` that describes the data series.
				`,
};
Item.propsName = 'Item';
Item.propTypes = {
	hasPoint: bool,
	hasLine: bool,
	color: string`
		Strings should match an existing color class unless they start with a '#' for specific colors. E.g.:

		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\`
	`,
	pointKind: number,
	onClick: func,
	className: string`
		Class names that are appended to the defaults.
	`,
};

export default Legend;