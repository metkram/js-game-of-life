"use strict";

class Game {
  constructor() {
    this.torus = new Torus();
    console.log(this.torus.matrix[5]);
  }
}

class Torus {
  constructor() {
    this.gridOnPage();
    this.blocks = document.body.querySelectorAll(".empty-cell");
    this.matrix = this.newMatrix();
  }
  get x() {
    return Math.floor(document.body.clientWidth / 12);
  }
  get y() {
    return Math.floor(document.body.clientHeight / 12);
  }
  newMatrix() {
    let matrix = [];
    for (let i = 0; i < this.y; i++) {
      let line = [];
      for (let u = 0; u < this.x; u++) {
        let cell = {};
        cell.x = i;
        cell.y = u;
        cell.alive = false;
        line.push(cell);
      }
      matrix.push(line);
    }
    return matrix;
  }
  gridOnPage() {
    for (let i = 0; i < this.y; i++) {
      let line = document.createElement("div");
      line.className = "cell-line";
      for (let u = 0; u < this.x; u++) {
        let cell = document.createElement("div");
        cell.className = "empty-cell";
        cell.innerText = i * this.y + u;
        line.append(cell);
      }
      document.body.append(line);
    }
  }
}

let newLife = new Game();
