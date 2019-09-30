import React from 'react';
import Item from './Item';
import './shelf_style.scss';

export default class ProductTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemNumbers: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.sizes !== this.props.sizes) {
			this.forceUpdate();
		}

		if (nextProps.products.products !== this.props.products.products) {
			this.forceUpdate();
		}
	}

	async componentDidMount() {
		var items = await this.props.getItemNumber();

		var itemMap = new Map(Object.entries(items));

		this.setState({
			itemNumbers: itemMap
		});
		//console.log("table item number is: ", this.state.itemNumbers.get('10412368723880252'));
	}

	render() {
		const products = this.props.products.products;
		const sizes = this.props.sizes;
		var rows = [];

		let tableProducts = [];

		for (let i = 0; i < products.length; i++) {
			let itemSizes = products[i].availableSizes;
			for (let j = 0; j < itemSizes.length; j++) {
				if (sizes.has(itemSizes[j])) {
					tableProducts.push(products[i]);
					break;
				}
			}
		}

		if (sizes.size <= 0) {
			tableProducts = products;
		}

		const rows = tableProducts.map((key, val) => {
			let item = tableProducts[val];
			let number = 0;
			if (this.state.itemNumbers instanceof Map) {
				number = this.state.itemNumbers.get(`${item.sku}`);
				return (
					<Item
						product={item}
						key={item.sku}
						handleAdd={this.props.handleAdd}
						number={number}
					/>
				);
			}
		});

		return (
			<div>
				<div className="found-number">
					{tableProducts.length} products found.
				</div>
				<div className="shelf-container">{rows}</div>
			</div>
		);
	}
}
