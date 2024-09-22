import p5 from "p5";

import P5Element from './p5-element.js';
import '../libs/ascii-p5.js';

export default class extends P5Element {
  constructor(id, state, emit) {
    super(id, state, emit)
  }

  sketch() {
    const s = ( p ) => {
      let img;
      let myAsciiArt;

      const asciiart_width = 500/10;
      const asciiart_height = 500/10;

      let gfx;

      let ascii_arr;


      p.preload = () => {
        // img = p.loadImage("https://cdn.glitch.global/b7eaf825-d3aa-4734-b03f-ab4ac4320123/love-puella-magi-madoka-magica.gif?v=1701822873256")
      };

      p.setup = () => {
        const canvas = p.createCanvas(500, 500);
        // const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.pixelDensity(1);
        gfx = p.createGraphics(asciiart_width, asciiart_height);
        gfx.pixelDensity(1);

        myAsciiArt = new p.AsciiArt(p);
        // myAsciiArt.printWeightTable();

        // frameRate(60);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('monospace', 12);
        p.textStyle(p.NORMAL);
      };
      
      let lastT = 0;

      p.draw = () => {
        let t = p.millis() * 0.001;
        if (img === undefined || p.chooState.urlsUpdated || Math.floor(t / 5) - Math.floor(lastT / 5) > 0) {
          if (p.chooState.urls !== undefined) {
            let index = Math.floor(Math.random() * p.chooState.urls.length);
            img = p.loadImage(p.chooState.urls[index]);
            p.chooState.urlsUpdated = false;
          }
        }
        
        if (img === undefined) return;
        lastT = t;
        p.image(img, 0, 0, 100, 100);
        p.background(0);
        p.noStroke();
        p.fill(255);
        gfx.background(0)
        // gfx.stroke(128)
        // gfx.strokeWeight(3)
        // gfx.circle(15, 15, 30 * Math.sin(millis()*0.003), 30);
        gfx.image(img, 0, 0, gfx.width, gfx.height);

        ascii_arr = myAsciiArt.convert(gfx);

        myAsciiArt.typeArray2d(ascii_arr, p);
      };
      
      p.windowResized = () => {
        // p.resizeCanvas(p.parentElement.clientWidth, p.parentElement.clientHeight);
      }
    };

    return new p5(s);
  }
}