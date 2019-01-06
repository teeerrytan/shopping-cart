import React, { Component } from 'react';

export default class Item extends React.Component{
    render(){
      //console.log(this.props.product);
      const product = this.props.product;
      const title = product.title;
      const price = product.price;
      const sku = product.sku;

      return (
          <div className="shelf-item">
            <div><img src={require(`../images/${sku}.jpg`)} alt={product.title}/></div>
            <div>{title}</div>
            <div>${price}</div>
            <div><button type="button">Add to cart</button></div>
          </div>
      );
    }
}