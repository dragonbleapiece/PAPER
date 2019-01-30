import React, { Component } from 'react';
import './HHatching.css';
import Hatching from '../Hatching';

/*Pencil*/
class HHatching extends Hatching {

  constructor(props) {
    super(props);
    this.className += " " + HHatching.className;
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    sk.stroke(255);
    let gapY = this.height / this.density;
    for(var j = 0; j <= this.density ; j++){
      sk.line(this.x, this.y + j * gapY, this.x + this.width, this.y + j * gapY);
    }
    sk.noStroke();
  }

}

HHatching.className = "HHatching";
HHatching.icon = undefined;

export default HHatching;
