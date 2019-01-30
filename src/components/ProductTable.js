import React, { Component } from 'react';
import Item from './Item';
import './shelf_style.scss';

export default class ProductTable extends React.Component{
    componentDidUpdate(prevProps) {
        if (this.props.sizes !== prevProps.sizes) {
          this.fetchData(this.props.sizes);
        }
      }
    render(){
      const rows = [];
      let tableProducts = this.props.products;
      //console.log(products);
      for(let i = 0;i < tableProducts.products.length; i++){
        rows.push(<Item product = {tableProducts.products[i]} handleAdd = {this.props.handleAdd}/>);
      }

      return(
          <div className="shelf-container">
              {rows}
          </div>
      );
    }
}