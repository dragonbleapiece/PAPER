import React, { Component } from 'react';
import Distribution from '../Distribution';
import './Grid.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Canvas from '../../Canvas/Canvas';
import DragBox from '../../DragBox/DragBox';
import ContextMenuBox from '../../ContextMenuBox/ContextMenuBox';
import Workspace from '../../Workspace/Workspace';

/*Pencil*/
class Grid extends Distribution {

  constructor(props) {
    super(props);
    this.className += " " + Grid.name;
    //const {columns, rows} = this.props;
    this.state.columns = 8;
    this.state.rows = 8;
  }

  draw(sk) {

    var column = sk.width/this.state.columns;
  	var row = sk.height/this.state.rows;
    var elem = this.next;

  	sk.background(0);
  	sk.stroke(255);
  	for(var i = 0; i < this.state.columns; i++) {
      sk.push();
        sk.translate(column * i, 0);
        sk.line(0, 0, 0, sk.height);
    		for(var j = 0; j < this.state.rows; j++) {
          sk.push();
            sk.translate(0, j * row);
            sk.line(0, 0, sk.width, 0);
            if(elem !== undefined) {
              sk.noStroke();
              sk.push();
                sk.translate(column / 2, row / 2);
                elem.draw(sk);
              sk.pop();
              /*elem.x = i * column + x;
              elem.y = j * row + y;*/
            }
          sk.pop();
    		}
      sk.pop();
  	}

  }


  renderBox() {
    return(
      <>
        <Slider
        min={1}
        max={20}
        defaultValue={this.state.columns}
        marks={{1: 1, 20: 20}}
        step={1}
        className="Box__slider"
        handleStyle={{ borderColor: 'black'}}
        trackStyle={{ backgroundColor: 'black' }}
        railStyle={{ backgroundColor: 'black' }}
        dotStyle={{ borderColor: 'black' }}
        activeHandleStyle={{borderColor: 'red'}}
        onChange={(value) => {this.setState({columns: value, rows: value}); Workspace.forceUpdate();}}
        />
        {this.getChildren()}
      </>
    );
  }

}

export default Grid;
