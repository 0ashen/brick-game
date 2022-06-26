import { TetrisFigureAbstract } from './tetris-figure-abstract';
import { TetrisShape } from './types';

export class TetrisFigureT extends TetrisFigureAbstract {
  constructor() {
    const relief: TetrisShape = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, 1]
    ];
    super(relief);
  }
}
