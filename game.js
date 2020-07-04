"use strict";

class Game {
  constructor() {
    this.torus = new Torus();
    this.cells = [];
    this.start = false;
    setTimeout(() => this.step(), 1000);
    this.torus.updateCells(this.torus.getNeighbors(0, 0), "alive");
  }
  theCreationOfAdam(e) {
    //have to add check for the same cells
    this.cells.push(e.target.innerText.split(","));
    this.torus.updateCells(this.cells, "alive");
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
    this.cellsArray = this.newCellsArray();
  }
  get x() {
    return Math.floor(document.body.clientWidth / 12);
  }
  get y() {
    return Math.floor(document.body.clientHeight / 12);
  }
  newCellsArray() {
    let cells = [];
    for (let i = 0; i < this.y; i++) {
      for (let u = 0; u < this.x; u++) {
        let cell = {};
        cell.x = i;
        cell.y = u;
        cell.alive = false;
        cells.push(cell);
      }
    }
    return cells;
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
    for (let cell of this.cellsArray) {
      if (cell.alive) {
        this.blocks[cell.x * this.x + cell.y].classList.add("alive-cell");
      } else {
        this.blocks[cell.x * this.x + cell.y].className = "empty-cell";
      }
    }
  }
  updateCells(cells, status) {
    switch (status) {
      case "dead":
        for (let cell of cells) {
          this.cellsArray.find(item => item.x == cell[0] && item.y == cell[1]).alive = false;
        }
        break;
      case "alive":
        for (let cell of cells) {
          this.cellsArray.find(item => item.x == cell[0] && item.y == cell[1]).alive = true;
        }
        break;
    }
    this.renderMatrix();
  }
  getNeighbors(x, y) {
    let neighbors = [[y, x - 1], [y - 1, x - 1], [y - 1, x], [y - 1, x + 1], [y, x + 1], [y + 1, x + 1], [y + 1, x], [y + 1, x - 1]];
    return neighbors.filter(item => item[0] > -1 && item[1] > -1 && item[0] < this.y && item[1] < this.x);
  }
  addAliveCells() {
    let alive = [];
    for (let i = 0; i < this.y; i++) {
      for (let u = 0; u < this.x; u++) {

      }
    }
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
