import React, { Component } from 'react';
import Item from './Item';
import './shelf_style.scss';

export default class ProductTable extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.sizes !== this.props.sizes) {
            this.forceUpdate();
        }

        if (nextProps.products.products !== this.props.products.products) {
            this.forceUpdate();
        }
    }

    render() {
        const products = this.props.products.products;
        console.log(products);
        const sizes = this.props.sizes;
        var rows = [];

        let tableProducts = [];
        console.log("sizes are: " + this.props.sizes);

        for (let i = 0; i < products.length; i++) {
            let itemSizes = products[i].availableSizes;
            console.log("itemSizes: " + itemSizes);
            for (let i = 0; i < itemSizes.length; i++) {
                if (sizes.has(itemSizes[i])) {
                    tableProducts.push(products[i]);
                    break;
                }
            }
        }

        if (sizes.size <= 0) {
            tableProducts = products;
        }
        
        console.log("products are: " + toString(tableProducts));
        for (let i = 0; i < tableProducts.length; i++) {
            rows.push(<Item product={tableProducts[i]} handleAdd={this.props.handleAdd} />);
        }
        console.log("rows: " + rows);

        return (
            <div className="shelf-container">
                {rows}
            </div>
        );
    }
}