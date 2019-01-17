import React, { Component } from 'react';
import './size.css';

export default class Size extends React.Component{
    render(){
        return (
            <div class="collection">
                <a href="#!" class="collection-item"><span class="badge">1</span>XS</a>
                <a href="#!" class="collection-item"><span class="new badge">4</span>S</a>
                <a href="#!" class="collection-item"><span class="badge">3</span>M</a>
                <a href="#!" class="collection-item"><span class="badge">5</span>X</a>
                <a href="#!" class="collection-item"><span class="badge">8</span>XL</a>
                <a href="#!" class="collection-item"><span class="badge">3</span>XXL</a>
            </div>
        );
    }
}