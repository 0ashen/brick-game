import { TetrisFigure } from '~/tetris/tetris-figure';

const i = () => new TetrisFigure(
  [
    [-1, 0],
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [0, 1],
);
const j = () => new TetrisFigure(
  [
    [0, 0],
    [0, -1],
    [1, 0],
    [2, 0],
  ],
);
const l = () => new TetrisFigure(
  [
    [0, 0],
    [1, 0],
    [0, -1],
    [0, -2],
  ],
);
const q = () => new TetrisFigure(
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [0],
);
const s = () => new TetrisFigure(
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [-1, 1],
  ],
  [0, 1],
);
const t = () => new TetrisFigure(
  [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, 1],
  ],
);

const z = () => new TetrisFigure(
  [
    [0, 0],
    [-1, 0],
    [0, 1],
    [1, 1],
  ],
  [0, 1],
);


export const tetrisFiguresCooked = [i, j, l, q, s, t, z];
