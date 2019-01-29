import React, { Component } from 'react';
import './Rectangle.css';
import Figure from '../Figure';
import square from '../../../Icons/square.svg';

/*Pencil*/
class Rectangle extends Figure {

  constructor(props) {
    super(props);
    this.className += " " + Rectangle.className;
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    sk.rect(this.x, this.y, this.width, this.height);
  }

}

Rectangle.className = "Rectangle";
Rectangle.icon = square;

export default Rectangle;
