import { TetrisFigureAbstract } from './tetris-figure-abstract';
import { TetrisShape } from './types';

export class TetrisFigureQ extends TetrisFigureAbstract {
  constructor() {
    const relief: TetrisShape = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1]
    ];
    super(relief);
  }

  protected canRotate(screenHistory: Array<Array<0 | 1>>): boolean {
    return false;
  }
}
