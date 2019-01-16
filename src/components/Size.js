import React, { Component } from 'react';
import './size.css';

export default class Size extends React.Component{
    render(){
        return (
            <div class="collection">
                <a href="#!" class="collection-item"><span class="badge">1</span>Alan</a>
                <a href="#!" class="collection-item"><span class="new badge">4</span>Alan</a>
                <a href="#!" class="collection-item">Alan</a>
                <a href="#!" class="collection-item"><span class="badge">14</span>Alan</a>
            </div>
        );
    }
}