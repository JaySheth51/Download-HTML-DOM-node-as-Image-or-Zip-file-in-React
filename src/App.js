import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

class App extends Component {

  downloadHandler(event){
    event.preventDefault();
    domtoimage.toBlob(document.getElementById('my-node'))
    .then(function (blob) {
        saveAs(blob, 'myImage.png');
    });
    
    let images = [];
    domtoimage.toBlob(document.getElementById('my-node'))
    .then(function (blob) {
        images.push(blob);
    }).then(function(){
      let zip = new JSZip();
      zip.file('myImage.png', images[0], { binary: true });       
      zip.generateAsync({ type: "blob" })
      .then(function callback(blob) {
        saveAs(blob, "myImage.zip");
      })
    })
  }
  render() {
    const divStyle = {
      width: "500px",
      height: "500px"
    }
    return (
      <div className="App" style={divStyle}>
        <div id="my-node">
          <img src={logo}  alt="sampleImage" />
        </div>
        <button onClick={this.downloadHandler.bind(this)} >Download as Image and Zip</button>
      </div>
    );
  }
}

export default App;
