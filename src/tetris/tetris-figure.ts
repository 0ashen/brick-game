import { TetrisMargin, TetrisRotateDirection, TetrisShape } from './types';

export class TetrisFigure {
  public offset: TetrisMargin = { x: 4, y: 0 };
  public rotateVariants: Array<TetrisRotateDirection> = [0, 1, 2, 3];
  private rotate: TetrisRotateDirection;

  constructor(
    private shape: TetrisShape,
    rotateVariants?: Array<TetrisRotateDirection>,
  ) {
    if (rotateVariants) {
      this.rotateVariants = rotateVariants;
    }
    this.rotate = Math.round(Math.random() * (this.rotateVariants.length - 1)) as TetrisRotateDirection;
  }

  public doRotate(): void {
    this.rotate = this.getNextRotateDirection();
  }

  public getShape(): TetrisShape {
    return this.getShapeWithRotate(this.rotate)
  }

  public getShapeWithNextRotate(): TetrisShape {
    return this.getShapeWithRotate(this.getNextRotateDirection())
  }

  private getNextRotateDirection(): TetrisRotateDirection {
    const idx = this.rotateVariants.findIndex((el) => el === this.rotate);

    if (this.rotateVariants[idx + 1]) {
      return this.rotateVariants[idx + 1]
    }

    return this.rotateVariants[0]
  }

  private getShapeWithRotate(rotate: TetrisRotateDirection): TetrisShape {

    if (rotate === 0) return this.shape;

    return this.shape.map(([x, y]) => {
      if (rotate === 1) {
        return [y * -1, x];
      }
      if (rotate === 2) {
        return [x * -1, y * -1];
      }
      if (rotate === 3) {
        return [y, x * -1];
      }

      return [x, y];
    });
  }
}
