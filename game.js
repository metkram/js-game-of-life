"use strict";

class Game {
  constructor() {
    this.torus = new Torus();
  }
}

class Torus {
  constructor() {
    this.shell = document.createElement("div");
    this.shell.id = "torus";
    for (let i = 0; i < 5776; i++) {
      let cell = document.createElement("div");
      cell.className = "empty-cell";
      cell.innerText = i;
      this.shell.append(cell);
    }
    document.body.append(this.shell);
  }
}

let newLife = new Game();
