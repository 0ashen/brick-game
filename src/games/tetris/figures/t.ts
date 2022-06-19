import { Figure, Relief } from '../types';

export class T extends Figure {
  constructor() {
    const relief: Relief = [
      [0, 0],
      [-1, 0],
      [1, 0],
      [0, 1]
    ];
    super(relief);
  }
}
