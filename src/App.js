import React, { Component } from 'react';
import './App.css';
import ProductTable from "./components/ProductTable";
import FloatCart from "./components/FloatCart";
import Size from "./components/Size";
import { redBright } from 'ansi-colors';
//import * as PRODUCTS from './data/products.json';

export default class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        productQuantity: 0,
        cartProducts: [],
        totalPrice: 0,
        cartIsOpen: false
      }
      this.handleAdd = this.handleAdd.bind(this)
      this.handleToggle = this.handleToggle.bind(this)
    }
    handleAdd(product) {
      this.setState(prevState => {
        return {
          productQuantity: prevState.productQuantity + 1,
          cartProducts: prevState.cartProducts.concat(product),
          totalPrice: prevState.totalPrice + product.price
        }
      })
      this.setState({ cartIsOpen: true })
    }
  
    handleToggle() {
      this.setState({
        cartIsOpen: !this.state.cartIsOpen
      })
    }
  
    removeProduct = product => {
      this.setState(prevState => {
        const { cartProducts } = prevState
        return { cartProducts: cartProducts.filter(p => p.sku !== product.sku) }
      })
    }
  render() {
    let PRODUCTS = require('./data/products.json');
    //console.log(PRODUCTS.products[1]);
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo center">APPAREL</a>
            <ul class="left hide-on-med-and-down">
              <li><a href="" >Sizes</a></li>
            </ul>
          </div>
        </nav>
        <div class="page">
          <Size class="Size"></Size>
          <ProductTable class="products" products = {PRODUCTS} handleAdd = {this.handleAdd}> </ProductTable>
          <FloatCart class="cart" 
            cartTotal={{
              productQuantity: this.state.productQuantity,
              totalPrice: this.state.totalPrice
            }}
            cartProducts={this.state.cartProducts}
            isOpen={this.state.cartIsOpen}
            handleToggle={this.handleToggle}
            removeProduct={this.removeProduct}></FloatCart>
        </div>
      </div>
    );
  }
}



