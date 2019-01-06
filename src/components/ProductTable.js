import React, { Component } from 'react';
import Item from './Item';

export default class ProductTable extends React.Component{
    render(){
      const rows = ["test","test2"];
      
      return(
          <table>
              <tbody>
                  <Item title = {"test1"} />
              </tbody>
          </table>
      )
    }
  }