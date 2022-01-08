export default class Goblin {
  constructor() {
    this.currentCell = -1;
  }

  setCurrentCell(index) {
    this.currentCell = index;
  }

  getCurrentCell() {
    return this.currentCell;
  }

  hit(index) {
    return this.currentCell === index;
  }
}
