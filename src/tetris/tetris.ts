import _ from 'lodash';
import { inject, singleton } from 'tsyringe';
import { Display, DisplayMatrix20x10, Game, KeyBind, KeyBindSlot } from '~/@types';
import { tetrisConfig } from './tetris-config';
import { TetrisFigureAbstract } from './tetris-figure-abstract';
import { TetrisFigureI } from './tetris-figure-i';
import { TetrisFigureJ } from './tetris-figure-j';
import { TetrisFigureL } from './tetris-figure-l';
import { TetrisFigureQ } from './tetris-figure-q';
import { TetrisFigureS } from './tetris-figure-s';
import { TetrisFigureT } from './tetris-figure-t';
import { TetrisFigureZ } from './tetris-figure-z';
import { TetrisDirection } from './types';

@singleton()
export class Tetris implements Game {
  private currentFigure: TetrisFigureAbstract = new TetrisFigureI();

  private displayMatrix: DisplayMatrix20x10 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  ] as unknown as DisplayMatrix20x10;

  private readonly figures: Array<new () => TetrisFigureAbstract> = [
    TetrisFigureT,
    TetrisFigureI,
    TetrisFigureJ,
    TetrisFigureL,
    TetrisFigureQ,
    TetrisFigureS,
    TetrisFigureZ,
  ];

  constructor(
    @inject('Display') private displayService: Display,
    @inject('Bindings') private keyBindService: KeyBind,
  ) {
    // this.refreshFigure();

    this.keyBindService.bind(KeyBindSlot.Left, this.handleFigureMove(TetrisDirection.Left));
    this.keyBindService.bind(KeyBindSlot.Right, this.handleFigureMove(TetrisDirection.Right));
    this.keyBindService.bind(KeyBindSlot.Down, this.handleFigureMove(TetrisDirection.Down));
    this.keyBindService.bind(KeyBindSlot.Top, this.handleFigureRotate);
  }

  public async run(): Promise<void> {
    this.displayService.draw(this.displayMatrix);

    while (true) {
      this.renderMatrixWithFigure();

      await this.timeout(tetrisConfig.animDelayGameTic);

      if (this.figureCanMove(TetrisDirection.Down)) {
        this.figureMove(TetrisDirection.Down);
      } else {
        this.displayMatrix = this.figureMap2Matrix();
        await this.removeFullRows();
        await this.removeEmptyRows();
        this.refreshFigure();
      }
    }
  }

  // has collision
  private figureCanMove(to: TetrisDirection): boolean {
    let xOffset = 0;
    xOffset += to === TetrisDirection.Left ? -1 : 0;
    xOffset += to === TetrisDirection.Right ? 1 : 0;
    const yOffset = to === TetrisDirection.Down ? 1 : 0;

    for (const [x, y] of this.currentFigure.getShape()) {
      // skip, if figure shape pixel upper than screen
      if (this.currentFigure.offset.y + y + yOffset < 0) {
        continue;
      }

      const col = this.displayMatrix[this.currentFigure.offset.y + y + yOffset];
      if (col === undefined) {
        return false;
      }
      const row = col[this.currentFigure.offset.x + x + xOffset];

      if (row === undefined || row === 1) {
        return false;
      }

    }

    return true;
  }

  private figureCanRotate(): boolean {
    for (const [x, y] of this.currentFigure.getShapeWithNextRotate()) {
      // skip, if figure upper than screen
      if (this.currentFigure.offset.y + y < 0) {
        continue;
      }

      const col = this.displayMatrix[this.currentFigure.offset.y + y];
      if (col === undefined) {
        return false;
      }
      const row = col[this.currentFigure.offset.x + x];

      if (row === undefined || row === 1) {
        return false;
      }
    }

    return true;
  }

  private figureMap2Matrix(): DisplayMatrix20x10 {
    const screen = _.cloneDeep(this.displayMatrix);

    for (const [x, y] of this.currentFigure.getShape()) {
      // if figure upper than screen, don't mapping to screen
      if (this.currentFigure.offset.y + y < 0) {
        continue;
      }
      screen[this.currentFigure.offset.y + y][this.currentFigure.offset.x + x] = 1;
    }

    return screen;
  }

  private figureMove(to: TetrisDirection): void {
    switch (to) {
      case TetrisDirection.Down:
        this.currentFigure.offset.y++;
        break;
      case TetrisDirection.Left:
        this.currentFigure.offset.x--;
        break;
      case TetrisDirection.Right:
        this.currentFigure.offset.x++;
        break;
    }
  }

  private handleFigureMove(to: TetrisDirection) {
    return () => {
      if (this.figureCanMove(to)) {
        this.figureMove(to);
        this.renderMatrixWithFigure();
      }
    };
  }

  private handleFigureRotate = () => {
    if (this.figureCanRotate()) {
      this.currentFigure.doRotate();
      this.renderMatrixWithFigure();
    }
  }

  private refreshFigure(): void {
    const randomizeNumber = Math.round(Math.random() * (this.figures.length - 1));
    this.currentFigure = new this.figures[randomizeNumber]();
  }

  private async removeEmptyRows(): Promise<void> {
    let hasActivePixelInPreviousRows = false;
    const matrix = _.cloneDeep(this.displayMatrix);
    for (let y = 0; y < matrix.length; y++) {
      const hasntActivePixelInTheRow = matrix[y].every((el) => el == 0);
      if (hasntActivePixelInTheRow && hasActivePixelInPreviousRows) {
        // cut the row and paste in begin of screen
        matrix.unshift(matrix.splice(y, 1)[0]);
        this.displayMatrix = _.cloneDeep(matrix);
        this.renderMatrix();
        await this.timeout(tetrisConfig.animDelayAfterRemove1FullRow);
      }
      if (!hasntActivePixelInTheRow) {
        hasActivePixelInPreviousRows = true;
      }
    }
  }

  private async removeFullRows(): Promise<void> {
    let matrix = _.cloneDeep(this.displayMatrix);
    for (let y = 0; y < matrix.length; y++) {
      const row = matrix[y];
      if (row.every((el) => el == 1)) {
        for (let i = 0; i <= 4; i++) {
          row[i + 5] = 0;
          row[4 - i] = 0;
          this.displayMatrix = _.cloneDeep(matrix);
          this.renderMatrix();
          await this.timeout(tetrisConfig.animDelayAfterTurnOffPixel);
        }
        await this.timeout(tetrisConfig.animDelayAfterTurnOffAllPixelInTheRow);
      }
    }
  }

  private renderMatrix(): void {
    this.displayService.draw(this.displayMatrix);
  }

  private renderMatrixWithFigure(): void {
    const resultScreen = this.figureMap2Matrix();
    this.displayService.draw(resultScreen);
  }

  private timeout(time: number): Promise<void> {
    return new Promise((res) => {
      setTimeout(() => {
        res();
      }, time);
    });
  };

}

