import React, { Component } from 'react';
import './VHatching.css';
import Hatching from '../Hatching';

/*Pencil*/
class VHatching extends Hatching {

  constructor(props) {
    super(props);
    this.className += " " + VHatching.className;
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;
  }

  drawFigure(sk) {
    sk.stroke(255);
    let gapX = this.width / this.density;
    for(var i = 0; i <= this.density ; i++){
      sk.line(this.x + i * gapX, this.y, this.x + i * gapX, this.y + this.height);
    }
    sk.noStroke();
  }

}

VHatching.className = "VHatching";
VHatching.icon = undefined;

export default VHatching;
