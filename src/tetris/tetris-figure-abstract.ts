import { DisplayMatrix20x10 } from '~/@types';
import { TetrisMargin, TetrisRotatePoss, TetrisShape } from './types';

export abstract class TetrisFigureAbstract {
  public offset: TetrisMargin = { x: 4, y: 0 };
  protected rotate: TetrisRotatePoss = Math.round(Math.random() * 3.49) as TetrisRotatePoss;

  protected constructor(
    protected shape: TetrisShape,
  ) {
  }

  public getPosition(): TetrisShape {
    return this.getShapeWithRotate(this.shape, this.rotate);
  }

  public makeRotate(screenHistory: DisplayMatrix20x10): void {
    if (this.canRotate(screenHistory)) {
      this.rotate = this.getNextRotatePos();
    }
  }

  protected getNextRotatePos(): TetrisRotatePoss {
    if (this.rotate === 0) return 1;
    if (this.rotate === 1) return 2;
    if (this.rotate === 2) return 3;
    if (this.rotate === 3) return 0;
    return 0;
  }

  protected canRotate(screen: Array<Array<0 | 1>>): boolean {
    for (const [x, y] of this.getShapeWithRotate(this.shape, this.getNextRotatePos())) {
      // skip, if figure upper than screen
      if (this.offset.y + y < 0) {
        continue;
      }

      const col = screen[this.offset.y + y];
      if (col === undefined) {
        return false;
      }
      const row = col[this.offset.x + x];

      if (row === undefined || row === 1) {
        return false;
      }
    }

    return true;
  }

  protected getShapeWithRotate(relief: TetrisShape, nextRotatePos: TetrisRotatePoss): TetrisShape {

    if (nextRotatePos === 0) return relief;

    return relief.map(([x, y]) => {
      if (nextRotatePos === 1) {
        return [y * -1, x];
      }
      if (nextRotatePos === 2) {
        return [x * -1, y * -1];
      }
      if (nextRotatePos === 3) {
        return [y, x * -1];
      }

      return [x, y];
    });
  }
}
