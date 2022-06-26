import { TetrisFigureAbstract } from './tetris-figure-abstract';
import { TetrisRotatePoss, TetrisShape } from './types';

export class TetrisFigureS extends TetrisFigureAbstract {
  constructor() {
    const relief: TetrisShape = [
      [0, 0],
      [1, 0],
      [0, 1],
      [-1, 1]
    ];
    super(relief);
  }

  protected getNextRotatePos(): TetrisRotatePoss {
    if (this.rotate === 0) return 1;
    if (this.rotate === 1) return 0;
    return 0;
  }
}
