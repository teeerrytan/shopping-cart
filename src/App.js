import React, { Component } from 'react';
import './App.css';
import ProductTable from "./components/ProductTable";
import FloatCart from "./components/FloatCart";
import Size from "./components/Size";
import { redBright } from 'ansi-colors';
//import * as PRODUCTS from './data/products.json';
import firebase from "firebase";
import * as firebaseui from 'firebaseui'
import styles from './firebase.css'; // This uses CSS modules.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
const config = {
  apiKey: "AIzaSyBjlc_JdOm6LXMO5qNxtk1OUo_BSy6R8BY",
  authDomain: "new-shopping-cart.firebaseapp.com"
};
const firebaseApp = firebase.initializeApp(config);


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productQuantity: 0,
      cartProducts: [],
      totalPrice: 0,
      cartIsOpen: false,
      sizes: [],
      isSignedIn: false
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    var provider = new firebase.auth.GoogleAuthProvider();
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

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
      return {
        productQuantity: prevState.productQuantity - 1,
        cartProducts: cartProducts.filter(p => p.sku !== product.sku),
        totalPrice: prevState.totalPrice - product.price
      }
    })
  }

  sizeFilter(size) {
    var tempSizes = this.state.sizes
    tempSizes.push(size);
    this.setState({
      sizes: tempSizes
    })
    console.log(this.state.sizes);
  }

  render() {
    let PRODUCTS = require('./data/products.json');
    //console.log(PRODUCTS.products[1]);
    let googleStyles = {
      height: '60px'
    };
    return (
      <div>
        <nav>
          <div class="nav-wrapper">
            <div class="left hide-on-med-and-down" style={googleStyles}>
              {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
                <div>
                  <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig}
                    firebaseAuth={firebaseApp.auth()} />
                </div>
              }
              {this.state.isSignedIn &&
                <div className={styles.signedIn}>
                  Hello {firebaseApp.auth().currentUser.displayName}. You are now signed In!
                  <a className={styles.button} onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
                </div>
              }
            </div>
            <a href="#!" class="brand-logo center">APPAREL</a>
          </div>
        </nav>

        <div class="page">
          <Size class="Size" sizes={this.state.sizes} sizeFilter={this.sizeFilter}></Size>
          <ProductTable class="products" sizes={this.state.sizes} products={PRODUCTS} handleAdd={this.handleAdd}> </ProductTable>
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



