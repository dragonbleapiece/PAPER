import React, { Component } from 'react';
import './Save.css';
import JSZip from 'jszip';
import {saveAs} from 'file-saver';

// import Components
import Canvas from '../../Components/Canvas/Canvas';
import BoxInputNumber from '../BoxInputNumber/BoxInputNumber';
//import Icons
import SVG from 'react-svg';
import icon_save_alt from '../../Icons/save_alt.svg';
import burst_mode from '../../Icons/burst_mode.svg';
import arrow_up from '../../Icons/arrow_upUI.svg';
import arrow_down from '../../Icons/arrow_downUI.svg';


class Save extends Component {
  state = {
    DownloadName: "Untitled",
    DownloadNameSaved: "Untitled",
    DownloadSuffixNumber: {
      svg: 0,
      jpg: 0
    },
    DownloadSuffix: "",
    DownloadFormat: "jpg",
    zipNumber: 10
  }
  downloadImage = function(el) {

    let nb = this.state.DownloadSuffixNumber;
    let dname = this.state.DownloadName;
    nb[this.state.DownloadFormat] = nb[this.state.DownloadFormat]+1;
    this.setState({DownloadSuffixNumber: nb});
    this.setState({DownloadSuffix: "-" + (nb[this.state.DownloadFormat]+1)});

    if (this.state.DownloadName === this.state.DownloadNameSaved) {
      dname = (nb[this.state.DownloadFormat] === 1) ? this.state.DownloadName : this.state.DownloadName + "-" + nb[this.state.DownloadFormat];
    } else {
      this.setState({DownloadNameSaved: this.state.DownloadName});
    }

    if(this.state.DownloadFormat === 'svg') {
      const blob = new Blob([Canvas.getImageData(true)], {type : 'image/svg+xml'});
      saveAs(blob, dname + '.svg');
    } else {
      Canvas.toBlob((blob) => saveAs(blob, dname + '.jpg'), 'image/jpeg');
    }
    console.log("SUFFIX", nb[this.state.DownloadFormat], "NAME + FORMAT", dname + "." + this.state.DownloadFormat);
  }

  downloadZip = function() {
    let zip = new JSZip();
    zip.file(this.state.DownloadName + ".txt", "By Paperwork\n");
    let img = zip.folder(this.state.DownloadName);
    const isSVG = this.state.DownloadFormat === 'svg';
    for(let i = 0; i < this.state.zipNumber; ++i) {
      const imageData = isSVG ? btoa(Canvas.getImageData(true)) : Canvas.getImageData(false);
      img.file(`${this.state.DownloadName}-${i}.${this.state.DownloadFormat}`, imageData, {base64: true});
      Canvas.draw();
    }
    const self = this;
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, self.state.DownloadName+".zip");
    });
  }

  incrementZipNumber = function() {
    this.setState({zipNumber: (this.state.zipNumber === 1000) ? this.state.zipNumber : parseInt(this.state.zipNumber)+1})
  }

  decrementZipNumber = function() {
    this.setState({zipNumber: (this.state.zipNumber === 1) ? this.state.zipNumber : parseInt(this.state.zipNumber)-1})
  }

    render() {
        return(
            <div className="save">
              <div className="button burstMode border-right" onClick={this.downloadZip.bind(this)}>
                <SVG src={burst_mode}/>
              </div>
              <div className="save__zipNumber border-right">
                <BoxInputNumber
                className="save__zipNumberInput"
                type="number"
                min={1}
                max={100}
                value={this.state.zipNumber}
                onChange={(value) => {
                  this.setState({zipNumber: value});
                }}
                onBlur={(event) => {
                  this.setState({zipNumber: event.target.value})
                }}
                />
                <div className="save__zipNumberArrows border-left">
                  <div className="button border-bottom" onClick={(event) => this.incrementZipNumber()}><SVG src={arrow_up}/></div>
                  <div className="button" onClick={(event) => this.decrementZipNumber()}><SVG src={arrow_down}/></div>
                </div>
              </div>
              <input
              className="save__name"
              type="text"
              value={this.state.DownloadName}
              onChange={(event) => {
                this.setState({DownloadSuffixNumber: {svg: 0, jpg: 0}, DownloadSuffix: "", DownloadName: event.target.value})
              }}
              onBlur={(event) => {
                const dname = (event.target.value === "") ? "Untitled" : event.target.value;
                this.setState({DownloadName: dname});
              }}
              />
              <span className="save__nameSuffixe">{this.state.DownloadSuffix}</span>
              <div className="save__format">
                <input id="save__jpg" type="radio" value="jpg" name="saveFormat" defaultChecked onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                <label htmlFor="save__jpg" className="save__formatItem button border-left">.jpg</label>
                <input id="save__svg" type="radio" value="svg" name="saveFormat" onChange={(event) => {if(event.target.checked) {this.setState({DownloadFormat: event.target.value})}}}/>
                <label htmlFor="save__svg" className="save__formatItem button border-left">.svg</label>
              </div>
              <a className="button save__button border-left" onClick={(event) => this.downloadImage(event.target)}>
                <SVG src={icon_save_alt}/>
              </a>
            </div>
        );
    }
}

export default Save;
