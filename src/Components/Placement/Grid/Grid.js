import React, { Component } from 'react';
import Placement from '../Placement';
import './Grid.css';
import 'rc-slider/assets/index.css';
import Canvas from '../../Canvas/Canvas';
import DragBox from '../../DragBox/DragBox';
import ContextMenuBox from '../../ContextMenuBox/ContextMenuBox';
import SliderBox from '../../Input/SliderBox/SliderBox';
import grid_on from '../../../Icons/grid_on.svg';

import LinearY from '../../Modes/GridMode/LinearY/LinearY';
import LinearX from '../../Modes/GridMode/LinearX/LinearX';
import DiagonalLeft from '../../Modes/GridMode/DiagonalLeft/DiagonalLeft';
import DiagonalRight from '../../Modes/GridMode/DiagonalRight/DiagonalRight';
import Orthogonal from '../../Modes/GridMode/Orthogonal/Orthogonal';
import SnailRight from '../../Modes/GridMode/SnailRight/SnailRight';

/*Pencil*/
class Grid extends Placement {

  constructor(props) {
    super(props);
    this.className += " " + Grid.className;
    //const {columns, rows} = this.props;
    this.state.columns = 8;
    this.state.rows = 8;
    this.state.currentMode = undefined;
  }

  draw(sk) {

    var column = sk.width/this.state.columns;
  	var row = sk.height/this.state.rows;
    var elem = this.next;
    var currentMode = this.state.currentMode;

  	if(!elem) sk.stroke(255);

    if(currentMode) {
      currentMode.mode(sk, {
        columns: this.state.columns,
        rows: this.state.rows,
        callback: function() {
          if(elem) {
            sk.noStroke();
            sk.push();
              sk.translate(column / 2, row / 2);
              sk.scale(column / 2, row / 2);
              elem.draw(sk);
            sk.pop();
          }
        }
      });
    }

  }


  renderBox() {
    return(
      <>
        <SliderBox
        min={1}
        max={50}
        defaultValue={this.state.columns}
        marks={{1: 1, 50: 50}}
        step={1}
        onChange={(value) => {this.setState({columns: value, rows: value});}}
        />
        <SnailRight ref={el => {this.state.currentMode = el}} />
      </>
    );
  }

}

Grid.className = "Grid";
Grid.icon = grid_on;

export default Grid;
