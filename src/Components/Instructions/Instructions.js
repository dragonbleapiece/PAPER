import React, { Component } from 'react';
import './Instructions.css';
import Canvas from '../Canvas/Canvas';
import Box from '../Box/Box';
import BoxGroup from '../BoxGroup/BoxGroup';
import {shallow, instance} from 'enzyme';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from '../../Constants.js';
import DropBox from '../DropBox/DropBox';
import DragBox from '../DragBox/DragBox';

class Instructions extends BoxGroup {

  static _instance;
  static setElements(elmnts) {
    if(Instructions._instance !== undefined) {
      Instructions._instance.setElements(elmnts);
    }
  }

  constructor(props) {
    if(Instructions._instance !== undefined) {
      return Instructions._instance;
    }
    super(props);
    this.className = this.constructor.name;
    Instructions._instance = this;
  }


  componentDidUpdate() {
    let canvas = new Canvas();
    let next = undefined;
    let children = this.state.elements.reverse();
    let instance = undefined;

    if(children.length > 0) {
      for(let i = 0; i < children.length; ++i) {
        let child = children[i];
        if(child === undefined) continue;
        if(child instanceof Box) {
          child.addNext(next);
          next = child;
        }
        else if(shallow(child).instance() instanceof Box) {
          instance = shallow(child).instance();
          instance.addNext(next);
          next = instance;
        }
      }

      if(instance !== undefined) {
        canvas.sendDraw(instance.draw.bind(instance));
      } else {
        canvas.sendDraw(children[children.length - 1].draw.bind(children[children.length - 1]));
      }
    }
  }

  render() {
    return (
      <div className={this.className}>
        <DropBox>
          {this.props.children}
        </DropBox>
      </div>
    );
  }
}

Instructions._instance = undefined;

export default DragDropContext(HTML5Backend)(Instructions);
