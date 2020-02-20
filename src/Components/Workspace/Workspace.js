import React from 'react';
import './Workspace.css';
import Canvas from '../Canvas/Canvas';
import BoxGroup from '../BoxGroup/BoxGroup';
import ContextMenuBox from '../ContextMenuBox/ContextMenuBox';
import Black from '../Colors/Black';

const menuColor = [
  {
    type: 'Background Color',
    elements: [
      {type: 'Black'},
      {type: 'White'},
      {type: 'Red'},
      {type: 'Orange'},
      {type: 'Yellow'},
      {type: 'Green'},
      {type: 'LightBlue',
      name: 'Light Blue'},
      {type: 'Blue'}
    ]
  }
];

const menuRefresh = [
  {
    type: 'Refresh'
  }
];

const className = "Workspace";
const unauthorized = ["Markov", "Series"];

class Workspace extends BoxGroup {

  static _instance;

  static get className() {
    return className;
  }

  static get icon() {
    return undefined;
  }

  static get unauthorized() {
    return unauthorized;
  }

  static addChild(box) {
    if(Workspace._instance !== undefined) {
      Workspace._instance.addChild(box);
    }
  }

  static forceUpdate() {
    if(Workspace._instance !== undefined) {
      Workspace._instance.forceUpdate();
    }
  }

  constructor(props) {
    if(Workspace._instance !== undefined) {
      return Workspace._instance;
    }
    super(props);
    this.className = this.constructor.className;
    this.elements = []; //no this.state.elements
    this.isFlexVertical = false;
    this.startDrag = {x: 0, y: 0};
    this.addDrawBeforeType("Figure", function(sk) {
      sk.scale(sk.width, sk.height);
      sk.translate(sk.width / 2, sk.height / 2);
      //sk.strokeWeight(1 / sk.width);
    });
    this.addDrawBeforeType("Recursion", function(sk) {
      sk.scale(sk.width, sk.height);
      sk.translate(sk.width / 2, sk.height / 2)
      //sk.strokeWeight(1 / sk.width);
    });
    Workspace._instance = this;
    // Redefinition of Menu Colors
    this.suppMenu = [
      {
        menu: menuColor,
        handleClick: (event, data) => {
          if(data.type) {
            let color = window.getClassFromName(data.type);
            if(color) this.setState({color: new color()});
            window.updateWorkspace();
          }
        }
      },
      {
        menu: menuRefresh,
        handleClick: (event, data) => {
          window.updateWorkspace();
        }
      }
    ];
  }

  initState() {
    super.initState();
    this.state.children = [];
    this.state.color = new Black();
  }

  draw(sk) {
    sk.fill(this.state.color.getColor(sk));
    sk.rect(0, 0, sk.width, sk.height);
    //background.sendToBack();
    super.draw(sk);
  }

  componentDidUpdate() {
    let canvas = new Canvas();
    canvas.sendDraw(this.draw.bind(this));
  }

  onDragStart(e) {
    this.startDrag.x = e.screenX;
    this.startDrag.y = e.screenY;
    let img = document.createElement('img');
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
    e.dataTransfer.effectAllowed = "all";
    e.stopPropagation();
  }

  onDrag(e) {
    if(this.state.children.length === 0) return;
    e.preventDefault();
    if(e.screenX || e.screenY) {
      let target = e.target;
      let movX = e.screenX - this.startDrag.x;
      let movY = e.screenY - this.startDrag.y;
      this.startDrag.x = e.screenX;
      this.startDrag.y = e.screenY;
      target.scrollLeft -= movX;
      target.scrollTop -= movY;
      //target.style.left = target.offsetLeft + movX + "px";
      //target.style.top = target.offsetTop + movY + "px";
    }
    e.stopPropagation();
  }

  getInstructions() {
    return (
      <div className="Workspace__placeholder">
        <p className="Workspace__Rightclick">Right click here</p>
        <div className="Workspace__Instructions">
          <p>To begin with...</p>
          <ol>
            <li>Choose <em>Placement > Grid</em></li>
            <li>Add in it a Markov</li>
            <li>Add in Markov some <em>Elements</em></li>
          </ol>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div draggable={this.state.children.length > 0} className={this.className} onDragStart={this.onDragStart.bind(this)} onDrag={this.onDrag.bind(this)}>
        <ContextMenuBox id={this.constructor.className} menu={[...this.menu, ...this.suppMenu]}>
          {this.state.children.length === 0 && this.getInstructions()}
          {this.state.children.length > 0 && <div className="Workspace__viewBox">
            <div className='DropBox' ref='container' onDrop={this.onDrop.bind(this)} onDragEnter={this.onDragEnter.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)}>
              {this.getChildren()}
            </div>
          </div>}
        </ContextMenuBox>
      </div>
    );
  }
}

export default Workspace;
