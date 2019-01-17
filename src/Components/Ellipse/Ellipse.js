import React, { Component } from 'react';
import './Ellipse.css';
import Box from '../Box/Box';

/*Pencil*/
class Ellipse extends Box {

  constructor(props) {
    super(props);
    this.className += " " + Ellipse.name;
    const {width, height} = this.props;
    this.width = width;
    this.height = height ? height : width;
    this.x = width / 2;
    this.y = this.height / 2;
  }

  draw(sk) {
    sk.ellipse(this.x, this.y, this.width, this.height);
  }

  render() {
    return (
      <div className={this.className}>
        <span>{this.constructor.name}</span>
      </div>
    );
  }
}

export default Ellipse;
