import React, { Component } from 'react';
import './App.css';
import ProductTable from "./components/ProductTable";
import FloatCart from "./components/FloatCart";
//import * as PRODUCTS from './data/products.json';

export default class App extends Component {
  render() {
    let PRODUCTS = require('./data/products.json');
    //console.log(PRODUCTS.products[1]);
    return (
      <div>
        <ProductTable products = {PRODUCTS}> </ProductTable>
        <FloatCart></FloatCart>
      </div>
    );
  }
}


