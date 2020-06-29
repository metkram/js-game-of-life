"use strict";

class Game {
  constructor() {
    this.torus = new Torus();
    console.log(this.torus.matrix[0]);
    this.cells = [];
    this.start = false;
    setTimeout(() => this.step(), 1000);
  }
  theCreationOfAdam(e) {
    //have to add check for the same cells
    this.cells.push(e.target.innerText.split(","));
    this.torus.addAliveCells(this.cells);
    console.log(this.cells);
  }
  step() {
    if (!this.start) return;
    if (this.cells) {
      this.torus.addAliveCells(this.cells);
      this.cells = [];
    }
    this.torus.renderMatrix();
    setTimeout(() => this.step(), 1000);
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
        cell.innerText = i + "," + u;
        line.append(cell);
      }
      document.body.append(line);
    }
  }
  renderMatrix() {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let u = 0; u < this.matrix[i].length; u++) {
        if (this.matrix[i][u].alive) this.blocks[i * this.x + u].classList.add("alive-cell");
      }
    }
  }
  addAliveCells(cells) {
    for (let cell of cells) {
      this.matrix[cell[0]][cell[1]].alive = true;
    }
    this.renderMatrix();
  }
}

let newLife = new Game();
let add = function(e) {
  newLife.theCreationOfAdam(e);
  if (newLife.cells.length > 9) {
    newLife.start = true;
    document.removeEventListener("click", add);
  }
}
document.addEventListener("click", add);
