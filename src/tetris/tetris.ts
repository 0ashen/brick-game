import _ from 'lodash';
import { inject, singleton } from 'tsyringe';
import { Display, Game, KeyBindings, KeyBindingsSlot } from '~/@types';
import { cookEmptyScreen, sleep } from '~/utils';
import { I, J, L, Q, S, T, Z } from './figures';
import { Direction, Figure } from './types';

@singleton()
export class Tetris implements Game {
  private currentFigure!: Figure;
  private screenHistory: Array<Array<0 | 1>> = cookEmptyScreen();
  private readonly figures: Array<new () => Figure> = [T, I, J, L, Q, S, Z];

  constructor(
    @inject('Display') private renderService: Display,
    @inject('Bindings') private keyBindService: KeyBindings,
  ) {
    this.refreshFigure();

    this.keyBindService.bind(KeyBindingsSlot.Left, this.handlerMoveFigure(Direction.Left));
    this.keyBindService.bind(KeyBindingsSlot.Right, this.handlerMoveFigure(Direction.Right));
    this.keyBindService.bind(KeyBindingsSlot.Down, this.handlerMoveFigure(Direction.Down));
    this.keyBindService.bind(KeyBindingsSlot.Top, this.handlerRotateFigure());
  }

  public async run(): Promise<void> {
    this.renderService.draw(this.screenHistory);

    while (true) {
      this.renderScreen();

      await sleep(500);

      if (this.currentFigure.canMoveTo(Direction.Down, this.screenHistory)) {
        this.currentFigure.moveTo(Direction.Down, this.screenHistory);
      } else {
        this.screenHistory = this.mappingToScreen(this.currentFigure, this.screenHistory);
        this.currentFigure.markAsDead();
        await this.handleFullRows();
        this.refreshFigure();
      }
    }
  }

  private handlerMoveFigure(to: Direction) {
    return () => {
      this.currentFigure.moveTo(to, this.screenHistory);
      this.renderScreen();
    };
  }

  private handlerRotateFigure() {
    return () => {
      this.currentFigure.makeRotate(this.screenHistory);
      this.renderScreen();
    };
  }

  private renderScreen(renderHistory?: boolean): void {
    const resultScreen = this.mappingToScreen(this.currentFigure, this.screenHistory);
    this.renderService.draw(resultScreen);
  }

  private refreshFigure(): void {
    const randomizeNumber = Number.parseInt((Math.random() * this.figures.length).toString());
    this.currentFigure = new this.figures[randomizeNumber]();
  }

  private mappingToScreen(figure: Figure, screenHistory: Array<Array<0 | 1>>): Array<Array<0 | 1>> {
    const screen = _.cloneDeep(screenHistory);

    for (const [x, y] of figure.relief) {
      // if figure upper than screen, just don't mappingToScreen to screen
      if (figure.pos.y + y < 0) {
        continue;
      }
      screen[figure.pos.y + y][figure.pos.x + x] = 1;
    }

    return screen;
  }

  private async handleFullRows(): Promise<void> {
    for (let y = 0; y < this.screenHistory.length; y++) {
      const row = this.screenHistory[y];
      if (row.every((el) => el == 1)) {
        for (let i = 0; i <= 4; i++) {
          row[i + 5] = 0;
          row[4 - i] = 0;
          this.renderScreen();
          await sleep(70);
        }
      }
    }
    this.handleEmptyRows();
  }

  private handleEmptyRows(): void {
    let hasPreviousRowBricks = false;
    for (let y = 0; y < this.screenHistory.length; y++) {
      if (this.screenHistory[y].every((el) => el == 0) && hasPreviousRowBricks) {
        this.screenHistory.unshift(this.screenHistory.splice(y, 1)[0]);
      } else {
        hasPreviousRowBricks = true;
      }
    }
    this.renderScreen();
  }
}

