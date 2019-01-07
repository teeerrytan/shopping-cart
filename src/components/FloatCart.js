import React, { Component } from 'react';
import './float_cart.scss';

export default class FloatCart extends React.Component{
    state = {
        isOpen: false
      };

    openFloatCart = () => {
    this.setState({ isOpen: true });
    };

    closeFloatCart = () => {
    this.setState({ isOpen: false });
    };
    render(){
        
        return (
            <span onClick={() => this.openFloatCart()} className="bag bag--float-cart-closed">
                <span className="bag__quantity"></span>
            </span>
        );
    }
}