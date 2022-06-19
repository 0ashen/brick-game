import { Figure, Relief } from '../types';
import { RenderPixelMatrix } from '~/render';

export class Q extends Figure {
  constructor() {
    const relief: Relief = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ];
    super(relief);
  }

  protected canRotate(screenHistory: RenderPixelMatrix): boolean {
    return false;
  }
}
