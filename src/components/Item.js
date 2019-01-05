import React, { Component } from 'react';

export default class Item extends React.Component{
    render(){
      const product = this.props.product;
      const title = product.title;
      const price = product.price;

      return (
        <tr>
          <img src={require("../images/${product.sku}.jpg")} alt={product.title}/>
          <div>{title}</div>
          <div>{price}</div>
          <button type="button">Add to cart</button>
        </tr>
      );
    }
  }