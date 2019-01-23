import React, { Component } from 'react';
import './ContextMenuBox.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

//import Icons
import SVG from 'react-svg'
import icon_save_alt from '../../Icons/save_alt.svg';
import icon_code from '../../Icons/code.svg';

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
        {type: 'Grid',
         icon: icon_save_alt}
      ]
  },
  {
    type: 'Grid',
    icon: icon_save_alt
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
      (item, index) => this.props.unauthorized.indexOf(item.type) == -1 &&
      <MenuItem className="ContextMenu__item" onClick={this.handleClick} data={{ type: item.type }} key={index}>
        {item.icon && <span className="react-contextmenu-itemIcon"><SVG src={item.icon}/></span>}
        <span className="react-contextmenu-itemText">{item.type}</span>
      </MenuItem>
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
