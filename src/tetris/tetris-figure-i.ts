import { TetrisFigureAbstract } from './tetris-figure-abstract';
import { TetrisRotateDirection, TetrisShape } from './types';

export class TetrisFigureI extends TetrisFigureAbstract {
  constructor() {
    const relief: TetrisShape = [
      [-1, 0],
      [0, 0],
      [1, 0],
      [2, 0]
    ];
    super(relief);
  }

  protected getNextRotateDirection(): TetrisRotateDirection {
    if (this.rotate === 0) return 1;
    if (this.rotate === 1) return 0;
    return 0;
  }
}
