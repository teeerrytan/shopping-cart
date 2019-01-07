import React, { Component } from 'react';
import Item from './Item';
import './shelf_style.scss';

export default class ProductTable extends React.Component{
    render(){
      const rows = [];
      let PRODUCTS = this.props.products;
      //console.log(products);
      for(let i = 0;i < PRODUCTS.products.length; i++){
        rows.push(<Item product = {PRODUCTS.products[i]}/>)
      }

      return(
          <div className="shelf-container">
              {rows}
          </div>
      );
    }
}