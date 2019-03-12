import React, { Component } from 'react'

export default class CartItem extends Component {

  state = {
    isMouseOver: false
  };

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  render() {
    const { product, removeProduct } = this.props;
    const classes = ['shelf-item'];

    if (!!this.state.isMouseOver) {
      classes.push('shelf-item--mouseover');
    }

    return (
      <div className={classes.join(' ')}>
      <div
        className="shelf-item__del"
        onMouseOver={() => this.handleMouseOver()}
        onMouseOut={() => this.handleMouseOut()}
        onClick={() => removeProduct(product)}
      />
      <img
        className="shelf-item__thumb"
        src={require(`../images/${product.sku}_2.jpg`)}
        alt={product.title}
      />
      <div className="shelf-item__details">
        <p className="title">{product.title}</p>
        <p style={{color: "white", marginTop:"-5px"}}>Price: </p>
      </div>
      <div className="shelf-item__price">
        <p>{`${product.currencyFormat}  ${product.price}`}</p>
      </div>

      <div className="clearfix" />
      </div>
    );
  }
}
