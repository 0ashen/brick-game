import { TetrisMargin, TetrisRotateDirection, TetrisShape } from './types';

export abstract class TetrisFigureAbstract {
  public offset: TetrisMargin = { x: 4, y: 0 };
  protected rotate!: TetrisRotateDirection;

  protected constructor(
    protected shape: TetrisShape,
  ) {
    this.getRandomRotateDirection();
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

  protected getNextRotateDirection(): TetrisRotateDirection {
    if (this.rotate === 0) return 1;
    if (this.rotate === 1) return 2;
    if (this.rotate === 2) return 3;
    if (this.rotate === 3) return 0;
    return 0;
  }

  protected getRandomRotateDirection() {
    return Array.from({ length: Math.round(Math.random() * 3.49) }).forEach((_) => {
      this.doRotate();
    })
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
