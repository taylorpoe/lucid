import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WarningLightIcon');

const WarningLightIcon = createClass({
	displayName: 'WarningLightIcon',

	statics: {
		peek: {
			description: `
				Diet version.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M7.99 6v4' />
				<circle className={cx('&-period')} cx='7.99' cy='12' r='.293' />
				<path d='M.5 15h15L8 .5z' />
			</Icon>
		);
	},
});

export default WarningLightIcon;
