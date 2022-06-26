import { TetrisFigureAbstract } from './tetris-figure-abstract';
import { TetrisShape } from './types';

export class TetrisFigureJ extends TetrisFigureAbstract {
  constructor() {
    const relief: TetrisShape = [
      [0, 0],
      [0, -1],
      [1, 0],
      [2, 0]
    ];
    super(relief);
  }
}
