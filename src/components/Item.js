import React from 'react';
import './shelf_style.scss';
import './materialize.css';

export default class Item extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			number: 0,
			sku: this.props.product.sku
		};
	}

	componentDidMount() {
		this.setState({
			number: this.props.number
		});
	}

	render() {
		//console.log(this.props.product);
		const { product } = this.props;
		const title = product.title;
		const price = product.price;
		const sku = product.sku;

		return (
			<div className="product-card">
				<div className="card">
					<div className="card-image">
						<img
							src={require(`../images/${sku}.jpg`)}
							alt={product.title}
						/>
						<span className="card-title" />
					</div>
					<div className="card-content">
						<p className="card-title">{title}</p>
						<p>Price: ${price}</p>
						<p>Availability: {this.state.number}</p>
					</div>
					<div className="card-action">
						<a
							onClick={() => this.props.handleAdd(product)}
							href="#"
						>
							Add to cart
						</a>
					</div>
				</div>
			</div>
		);
	}
}
