import React, { Component } from 'react';
import './size.scss';

export default class Size extends React.Component {
	chipRow = [];
	addChip(i) {
		console.log('XS');
	}
	render() {
		const sizes = ['XS', 'S', 'M', 'X', 'ML', 'L', 'XL', 'XXL'];
		const sizeButtons = sizes.map(sz => {
			return (
				<SizeButton
					key={sz}
					size={sz}
					handleToggleFilterSize={() =>
						this.props.handleToggleFilterSize(sz)
					}
				/>
			);
		});

		return (
			<div className="filters">
				<h5 className="title">Filters:</h5>
				{sizeButtons}
			</div>
		);
	}
}

class SizeButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggled: false
		};
	}

	toggleCheckboxChange = () => {
		this.setState(({ toggled }) => ({
			toggled: !toggled
		}));
		this.props.handleToggleFilterSize();
	};

	render() {
		return (
			<div className="filters-available-size">
				<label>
					<input
						type="checkbox"
						value={this.props.size}
						checked={this.state.toggled}
						onChange={this.toggleCheckboxChange}
					/>
					<span className="checkmark">{this.props.size}</span>
				</label>
			</div>
		);
	}
}
