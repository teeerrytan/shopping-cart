import React, { Component } from 'react';
import './shelf_style.scss';
import './materialize.css';

export default class Item extends React.Component {
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
            <img src={require(`../images/${sku}.jpg`)} alt={product.title} />
            <span className="card-title"></span>
          </div>
          <div className="card-content">
            <p className="card-title">{title}</p>
            <p>Price: ${price}</p>
          </div>
          <div className="card-action">
            <a onClick={() => this.props.handleAdd(product)} href="javascript:void(0)">Add to cart</a>
          </div>
        </div>
      </div>
    );
  }
}