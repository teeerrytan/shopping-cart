import React, { Component } from 'react';
import './size.css';

export default class Size extends React.Component {
    render() {
        return (
            <div class="collection">
                <a onClick={() => this.props.sizeFilter("XS")} href="javascript:void(0)" class="collection-item" ><span class="new badge" data-badge-caption="In Stock"></span>XS</a>
                <a onClick={() => this.props.sizeFilter("S")} href="javascript:void(0)" class="collection-item"><span class="new badge" data-badge-caption="In Stock"></span>S</a>
                <a onClick={() => this.props.sizeFilter("M")} href="javascript:void(0)" class="collection-item"><span class="new badge" data-badge-caption="In Stock"></span>M</a>
                <a onClick={() => this.props.sizeFilter("X")} href="javascript:void(0)"  class="collection-item"><span class="new badge" data-badge-caption="In Stock"></span>X</a>
                <a onClick={() => this.props.sizeFilter("XL")} href="javascript:void(0)" class="collection-item"><span class="new badge" data-badge-caption="In Stock"></span>XL</a>
                <a onClick={() => this.props.sizeFilter("XXL")} href="javascript:void(0)" class="collection-item"><span class="new badge" data-badge-caption="In Stock"></span>XXL</a>
            </div>
        );
    }
}