import Board from './Board';
import Goblin from './Goblin';

const cells = document.getElementsByClassName('cell');
const eScores = document.getElementById('scores');
const eMisses = document.getElementById('misses');
const pop = document.getElementsByClassName('game_end')[0];

const goblin = new Goblin();
const board = new Board(goblin, eScores, eMisses, pop);
board.init(cells);
