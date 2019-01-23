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
    this.columns = 10;
    this.rows = 10;
  }
  state = {
    columns: 8,
    rows: 8
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
              if(elem.next !== undefined)
                sk.translate(column / 2 - elem.next.width / 2, row / 2 - elem.next.height / 2);
              /*elem.x = i * column + x;
              elem.y = j * row + y;*/
              elem.draw(sk);
              if(elem.next !== undefined)
                sk.translate(-(column / 2 - elem.next.width / 2), -(row / 2 - elem.next.height / 2));
            }
          sk.pop();
    		}
      sk.pop();
  	}

  }


  wrapperStyle = { width: 100, margin: 20};
  render() {
    return(
      <ContextMenuBox id={this.constructor.name} unauthorized={this.unauthorized}>
        <DragBox name={this.constructor.name} className={this.className}>
        {this.props.children}
        <Slider
        min={1}
        max={20}
        defaultValue={this.state.columns}
        marks={{1: 1, 20: 20}}
        step={1}
        style={this.wrapperStyle}
        railStyle={{ backgroundColor: 'black' }}
        dotStyle={{ borderColor: 'black' }}
        onChange={(value) => {this.setState({columns: value, rows: value}); Workspace.forceUpdate();}}
        />
      </DragBox>
    </ContextMenuBox>
    );
  }

}

export default Grid;
