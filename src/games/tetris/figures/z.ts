import { Figure, Relief, RotatePoss } from '../types';

export class Z extends Figure {
  constructor() {
    const relief: Relief = [
      [0, 0],
      [-1, 0],
      [0, 1],
      [1, 1]
    ];
    super(relief);
  }

  protected get getNextRotatePos(): RotatePoss {
    if (this.rotate === 0) return 1;
    if (this.rotate === 1) return 0;
    return 0;
  }
}
