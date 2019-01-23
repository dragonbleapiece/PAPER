import React, { Component } from 'react';
import './ContextMenuBox.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const menu = [
  {
    type: 'Figure',
    elements: [
      {type: 'Rectangle'},
      {type: 'Triangle'},
      {type: 'Ellipse'}
    ]
  },
  {
    type: 'Color',
    elements: [
      {type: 'Red'},
      {type: 'Blue'},
      {type: 'Green'}
    ]
  },
  {
    type: 'Markov'
  },
  {
    type: 'Distribution',
      elements: [
        {type: 'Grid'}
      ]
  },
  {
    type: 'Grid'
  }
];

class ContextMenuBox extends Component {
  state = {};

  constructor(props) {
    super(props);

  }

  handleClick(event, data) {
    if(data.type !== undefined) {
      window.addClassToWorkspace(data.type);
    }
  }

  render() {

    let menuItems = menu.map(
      (item, index) => this.props.unauthorized.indexOf(item.type) == -1 && <MenuItem onClick={this.handleClick} data={{ type: item.type }} key={index}>{item.type}</MenuItem>
    );

    return (
      <>
        <ContextMenuTrigger id={this.props.id} holdToDisplay={-1}>
            {this.props.children}
        </ContextMenuTrigger>
        <ContextMenu id={this.props.id}>
            {menuItems}
        </ContextMenu>
      </>
    );
  }
}

export default ContextMenuBox;
