import React from 'react';
import createClass from 'create-react-class';
import IconBox from '../IconBox';
import ClockIcon from '../../Icon/ClockIcon/ClockIcon';

export default createClass({
	render() {
		const style = {
			marginRight: '10px',
			display: 'grid',
			justifyItems: 'center',
		};
		return (
			<section
				style={{
					display: 'flex',
				}}
			>
				<article style={style}>
					<h3>Is Active</h3>
					<IconBox kind="checkbox" isActive={true}>
						<IconBox.Icon><ClockIcon /></IconBox.Icon>
						Active IconBox
					</IconBox>
				</article>
				<article style={style}>
					<h3>Is Disabled</h3>
					<IconBox kind="checkbox" isDisabled={true}>
						<IconBox.Icon><ClockIcon /></IconBox.Icon>
						Disabled IconBox
					</IconBox>
				</article>
				<article style={style}>
					<h3>Is Indeterminate</h3>
					<IconBox kind="checkbox" isIndeterminate={true}>
						<IconBox.Icon><ClockIcon /></IconBox.Icon>
						Indeterminate IconBox
					</IconBox>
				</article>
				<article style={style}>
					<h3>Is Selected</h3>
					<IconBox kind="checkbox" isSelected={true}>
						<IconBox.Icon><ClockIcon /></IconBox.Icon>
						Selected IconBox
					</IconBox>
				</article>
			</section>
		);
	},
});