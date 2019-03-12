import React, { Component } from 'react';
import './App.scss';
import ProductTable from "./components/ProductTable";
import FloatCart from "./components/FloatCart";
import Size from "./components/Size";
import { redBright } from 'ansi-colors';
//import * as PRODUCTS from './data/products.json';
import firebase from "firebase";
import * as firebaseui from 'firebaseui'
import styles from './firebase.css'; // This uses CSS modules.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from "firebase/app";

const config = {
  apiKey: "AIzaSyBjlc_JdOm6LXMO5qNxtk1OUo_BSy6R8BY",
  authDomain: "new-shopping-cart.firebaseapp.com",
  databaseURL: "https://new-shopping-cart.firebaseio.com",
  projectId: "new-shopping-cart",
  storageBucket: "new-shopping-cart.appspot.com",
  messagingSenderId: "975935197091"
};
const firebaseApp = firebase.initializeApp(config);
var db = firebase.firestore();
var userRef = db.collection("users");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.db = firebaseApp.firestore();
    this.state = {
      productQuantity: 0,
      cartProducts: [],
      totalPrice: 0,
      cartIsOpen: false,
      sizes: new Set(),
      isSignedIn: false,
      itemNumbers: {},
      UID: ""
    }
    this.handleAdd = this.handleAdd.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    var provider = new firebase.auth.GoogleAuthProvider();
  }

  async componentDidMount() {
    
    await firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log("User UID is: " + user.uid);
        this.setState({
          UID: user.uid
        })
        var docRef = userRef.doc(user.uid);
        let cartDB = [];
        let tp = 0;
        let quantity = 0;
        try{
          docRef.get().then(async userDoc => {
            console.log("userDOC is: " + userDoc);
            if(userDoc.exists){
              cartDB = Object.values(userDoc.data().items);
              tp = Number(userDoc.data().totalPrice);
              quantity = userDoc.data().quantity;
              await this.setState({
                cartProducts: cartDB,
                totalPrice: tp,
                productQuantity: quantity
              })
            }else{
              console.log("testtest");
              if(this.state.cartProducts !== []){
                db.collection("users").doc(user.uid).set({
                  items: this.state.cartProducts,
                  totalPrice: Number(this.state.totalPrice),
                  quantity: this.state.productQuantity
                })
              }
            }
          })
          
        } catch (e){
          console.log(e);
        }
      }
    })

    var items = await this.getItemNumber();

    var itemMap = new Map(Object.entries(items));

    this.setState({
      itemNumbers: itemMap
    })
  }

  handleCheckout = async total => {
    if (total <= 0) {
      alert("Please buy some stuff. We are poor.")
    } else {
      alert("Your total price is: " + total + ". Thank you so much!");
      await this.setState({
        productQuantity: 0,
        cartProducts: [],
        totalPrice: 0
      })
    }
  }

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  getItemNumber = async () => {
    var availRef = this.db.collection("items").doc("availability");
    try {
      const items = await availRef.get();
      return items.data();
    } catch (e) {
      console.log("The error is", e);
      return 0;
    }
  }

  async handleAdd(product) {
    console.log("type of product: " + typeof product);
    await console.log("prev is: " + this.state.cartProducts);
    await this.setState(prevState => {
      return {
        productQuantity: prevState.productQuantity + 1,
        cartProducts: prevState.cartProducts.concat(product),
        totalPrice: prevState.totalPrice + product.price
      }
    })
    let tempPrice = await Number(this.state.totalPrice);
    
    await db.collection("users").doc(this.state.UID).set({
      items: this.state.cartProducts,
      totalPrice: tempPrice.toFixed(2),
      quantity: this.state.productQuantity
    })
    this.setState({ cartIsOpen: true })
  }

  handleToggle() {
    this.setState({
      cartIsOpen: !this.state.cartIsOpen
    })
  }

  async updateItem(sku) {
    console.log("before " + this.state.itemNumbers.get(sku));

    let tempMap = this.state.itemNumbers;
    await tempMap.set(sku, tempMap.get(sku) - 1);
    this.setState({
      itemNumbers: tempMap
    })
    console.log("after " + this.state.itemNumbers.get(sku));
  }

  removeProduct = async product => {
    console.log("sku is: " + product.sku);
    await this.updateItem(product.sku);
    await this.setState(prevState => {
      const { cartProducts } = prevState
      return {
        productQuantity: prevState.productQuantity - 1,
        cartProducts: cartProducts.filter(p => p.sku !== product.sku),
        totalPrice: prevState.totalPrice - product.price
      }
    })
    let tempPrice = await Number(this.state.totalPrice);

    await db.collection("users").doc(this.state.UID).set({
      items: this.state.cartProducts,
      totalPrice: tempPrice.toFixed(2),
      quantity: this.state.productQuantity
    })
  }

  handleToggleFilterSize(size) {
    var filterSizes = this.state.sizes;
    if (filterSizes.has(size)) {
      filterSizes.delete(size);
    } else {
      filterSizes.add(size);
    }
    this.setState({
      sizes: filterSizes,
    });
    return;
  }

  render() {
    let PRODUCTS = require('./data/products.json');
    let googleStyles = {
      height: '60px'
    };
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <div className="left hide-on-med-and-down" style={googleStyles}>
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
            <a href="#!" className="brand-logo center">APPAREL</a>
          </div>
        </nav>

        <div className="page">
          <Size className="Size" sizes={this.state.sizes} handleToggleFilterSize={(size) => this.handleToggleFilterSize(size)}></Size>
          <ProductTable className="products" sizes={this.state.sizes} products={PRODUCTS} handleAdd={this.handleAdd} getItemNumber={this.getItemNumber} >
          </ProductTable>
          <FloatCart className="cart"
            cartTotal={{
              productQuantity: this.state.productQuantity,
              totalPrice: this.state.totalPrice
            }}
            cartProducts={this.state.cartProducts}
            isOpen={this.state.cartIsOpen}
            handleToggle={this.handleToggle}
            removeProduct={this.removeProduct}
            getItemNumber={this.getItemNumber}
            handleCheckout={this.handleCheckout}
          >
          </FloatCart>
        </div>
      </div>
    );
  }
}



