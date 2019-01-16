import React, { Component } from 'react';
import './App.css';
import ProductTable from "./components/ProductTable";
import FloatCart from "./components/FloatCart";
import Size from "./components/Size";
import { redBright } from 'ansi-colors';
//import * as PRODUCTS from './data/products.json';

export default class App extends Component {
  render() {
    let PRODUCTS = require('./data/products.json');
    //console.log(PRODUCTS.products[1]);
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo center">APPAREL</a>
            <ul class="left hide-on-med-and-down">
              <li><a href="">Sizes</a></li>
            </ul>
            <ul class="right hide-on-med-and-down">
              <li style={{border: 'solid'}}><a onclick="openNav()">Cart</a></li>
            </ul>
          </div>
        </nav>
        <div class="page">
          <Size class="Size"></Size>
          <ProductTable class="products" products = {PRODUCTS}> </ProductTable>
          <FloatCart class="cart"></FloatCart>
        </div>
      </div>
    );
  }
}



