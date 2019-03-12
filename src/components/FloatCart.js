import React, { Component } from 'react';
import CartItem from './CartItem';
import './float_cart.scss';
import { object } from 'prop-types';

export default class FloatCart extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          isOpen: false,
          itemNumbers: {}
        }
      }

    async componentDidMount(){
      var items = await this.props.getItemNumber();
      
      var itemMap = await new Map(Object.entries(items));

      await this.setState({
          itemNumbers: itemMap
      })
    }

    render() {
      const { cartTotal, cartProducts, removeProduct} = this.props;
      let products = [];
      let tempMap = this.state.itemNumbers;
      //////////////////////////////////////////////////////////////////////////////////////
      if(cartProducts !== []){
        products = cartProducts.map(product => {
          tempMap.set(`${product.sku}`, tempMap.get(`${product.sku}`) <= 1 ? 0 : tempMap.get(`${product.sku}`) - 1);
          return <CartItem product={product} key={product.id} removeProduct={removeProduct} />
        })
      }
      return (
        <div className={`float-cart${this.props.isOpen ? ' float-cart--open' : ''}`}>
          {(() => {
            if (this.props.isOpen) {
              return (
                <div
                  onClick={() => this.props.handleToggle()}
                  className="float-cart__close-btn"
                >
                  X
                </div>
              )
            } else {
              return (
                <span
                  onClick={() => this.props.handleToggle()}
                  className="bag bag--float-cart-closed"
                >
                  <span className="bag__quantity">{cartTotal.productQuantity}</span>
                </span>
              )
            }
          })()}
  
          <div className="float-cart__content">
            <div className="float-cart__header">
              <span className="bag">
                <span className="bag__quantity">{cartTotal.productQuantity}</span>
              </span>
              <span className="header-title">Shopping Cart</span>
            </div>
  
            <div className="float-cart__shelf-container">
              {products}
              {!products.length && (
                <p className="shelf-empty">
                  Add some products in the cart. <br />
                  :)
                </p>
              )}
            </div>
  
            <div className="float-cart__footer">
              <div className="sub">SUBTOTAL</div>
              <div className="sub-price">
                <p className="sub-price__val">
                  {`${cartTotal.totalPrice}`}
                </p>
              </div>
              <div className="buy-btn" onClick={() => this.props.handleCheckout(cartTotal.totalPrice, this.state.itemNumbers)}>
                Checkout
              </div>
            </div>
          </div>
        </div>
      )
    }
}