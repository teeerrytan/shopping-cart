import React, { Component } from 'react';
import './shelf_style.scss';
import './materialize.css';

export default class Item extends React.Component{
    render(){
      //console.log(this.props.product);
      const product = this.props.product;
      const title = product.title;
      const price = product.price;
      const sku = product.sku;

      return (
            <div class="product-card">
              <div class="card">
                <div class="card-image">
                  <img src={require(`../images/${sku}.jpg`)} alt={product.title}/>
                  <span class="card-title"></span>
                </div>
                <div class="card-content">
                  <p class="card-title">{title}</p>
                  <p>Price: ${price}</p>
                </div>
                <div class="card-action">
                  <a href="#">Add to cart</a>
                </div>
              </div>
            </div>
      );
    }
}