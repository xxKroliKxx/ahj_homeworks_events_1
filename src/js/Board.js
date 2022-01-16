function getRandomInt(min, max) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
}

export default class Board {
  constructor(goblin, scores, misses, pop) {
    this.cells = [];
    this.cellClickListeners = [];
    this.goblin = goblin;
    this.scoresElement = scores;
    this.missesElement = misses;
    this.popElement = pop;
    this.scores = 0;
    this.misses = 0;
    this.timerId = null;
  }

  init(cells, button) {
    this.setCellTimer();
    this.cells = Array.from(cells);
    this.setCellClickEvent();
    button.addEventListener('click', (event) => this.onButtonClick(event));
  }

  onCellClick(event) {
    if (this.misses === 5) return;
    const index = this.cells.indexOf(event.currentTarget);
    if (this.goblin.hit(index)) { this.setScores(); } else { this.setMisses(); }
  }

  onButtonClick() {
    this.misses = 0;
    this.popElement.classList.add('game_end_display');
    this.scores = 0;
    this.misses = 0;
    this.missesElement.innerText = this.misses;
    this.scoresElement.innerText = this.scores;
    this.setCellTimer();
  }

  changeCell() {
    let index = getRandomInt(0, this.cells.length);
    let cell = this.cells[index];

    const currentIndex = this.goblin.getCurrentCell();
    if (currentIndex === -1) {
      cell.classList.add('cell__active');
      this.goblin.setCurrentCell(index);
      return;
    }

    this.cells[currentIndex].classList.remove('cell__active');
    while (cell === this.cells[currentIndex]) {
      index = getRandomInt(0, this.cells.length);
      cell = this.cells[index];
    }
    cell.classList.add('cell__active');
    this.goblin.setCurrentCell(index);
  }

  setCellClickEvent() {
    for (let index = 0; index < this.cells.length; index += 1) {
      const cellEl = this.cells[index];
      cellEl.addEventListener('click', (event) => this.onCellClick(event));
    }
  }

  setScores() {
    this.changeCell();
    this.scores += 1;
    this.scoresElement.innerText = this.scores;
    this.setCellTimer();
  }

  setMisses() {
    this.misses += 1;
    this.missesElement.innerText = this.misses;
    if (this.misses === 5) {
      clearInterval(this.timerId);
      this.popElement.classList.remove('game_end_display');
    }
  }

  setCellTimer() {
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.changeCell();
    }, 1500);
  }
}
