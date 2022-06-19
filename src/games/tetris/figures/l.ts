import { Figure, Relief } from '../types';

export class L extends Figure {
  constructor() {
    const relief: Relief = [
      [0, 0],
      [1, 0],
      [0, -1],
      [0, -2]
    ];
    super(relief);
  }
}
