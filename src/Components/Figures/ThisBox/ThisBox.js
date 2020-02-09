import Figure from '../Figure';
import Canvas from '../../Canvas/Canvas';
import './ThisBox.css';
import thisIcon from '../../../Icons/my_location.svg';

const className = "ThisBox";
const unauthorized = ["*"];

/*Pencil*/
class ThisBox extends Figure {

  static get className() {
    return className;
  }

  static get icon() {
    return thisIcon;
  }

  static get unauthorized() {
    return [...super.unauthorized, ...unauthorized];
  }

  constructor(props) {
    super(props);
    this.className += " " + ThisBox.className;
    this.suppMenu = [];
    this.recursionParent = null;
    this.recursion = 0;
    Canvas.attach(this);
  }

  receiveNotification() {
    this.recursion = 0;
  }

  componentDidMount() {
    this.getRecursionDraw();
  }

  componentWillUnmount() {
    Canvas.detach(this);
    this.recursionParent.setState({nbThisBox: this.recursionParent.state.nbThisBox - 1});
  }


  getColorMenu() {
    return [];
  }

  getRecursionDraw() {
    let parent = this.props.parent;
    while(parent && parent.constructor.className !== 'Recursion') {
        parent = parent.props.parent;    
    }
    if(!parent) {
        this.onClose();
    } else {
        this.recursionParent = parent;
        this.recursionParent.setState({nbThisBox: this.recursionParent.state.nbThisBox + 1});
    }
  }

  onDragStart(e) {
    e.preventDefault();
  }

  drawFigure(sk) {
    if(this.recursionParent && this.recursion < this.recursionParent.state.recursionMax) {
      ++this.recursionParent.globalRecursion;
      ++this.recursion;
      this.recursionParent.draw(sk);
      --this.recursion;
      --this.recursionParent.globalRecursion;
    }
  }

  draw(sk) {
    const scale = this.scale;
    const {x, y} = this.position;
    sk.push();
      sk.rotate(this.rotation, x, y);
      sk.scale(scale.x, scale.y, x, y);
      sk.translate(x, y);
      this.drawFigure(sk);
    sk.pop();
  }

}

export default ThisBox;