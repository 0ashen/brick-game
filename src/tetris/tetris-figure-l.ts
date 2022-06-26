import { TetrisFigureAbstract } from './tetris-figure-abstract';
import { TetrisShape } from './types';

export class TetrisFigureL extends TetrisFigureAbstract {
  constructor() {
    const relief: TetrisShape = [
      [0, 0],
      [1, 0],
      [0, -1],
      [0, -2]
    ];
    super(relief);
  }
}
