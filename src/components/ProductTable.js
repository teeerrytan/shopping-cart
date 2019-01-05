import React, { Component } from 'react';
import Item from './Item';

export default class ProductTable extends React.Component{
    render(){
      const rows = [];
      this.props.products.forEach((product) => {
          rows.push(
              <Item product = {product}/>
          )
      })

      return(
          <table>
              <tbody>
                  {rows}
              </tbody>
          </table>
      )
    }
  }