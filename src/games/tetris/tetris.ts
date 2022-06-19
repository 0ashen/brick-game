import _ from 'lodash';
import { inject, singleton } from 'tsyringe';
import { Draw, Game } from '~/@types';
import { KeyBindings, KeyBindingsSlot } from '~/key-bindings';
import { RenderPixelMatrix } from '~/render';
import { cookEmptyScreen, sleep } from '~/utils';
import { I, J, L, Q, S, T, Z } from './figures';
import { Direction, Figure } from './types';

@singleton()
export class Tetris implements Game {
  private readonly figures: Array<new () => Figure> = [T, I, J, L, Q, S, Z];
  private currentFigure!: Figure;
  private screenHistory: RenderPixelMatrix;

  constructor(@inject('Draw') private render: Draw, private keyBindings: KeyBindings) {
    this.refreshFigure();
    this.screenHistory = cookEmptyScreen();

    this.keyBindings.setHandler(KeyBindingsSlot.Left, this.handlerMoveFigure(Direction.Left));
    this.keyBindings.setHandler(KeyBindingsSlot.Right, this.handlerMoveFigure(Direction.Right));
    this.keyBindings.setHandler(KeyBindingsSlot.Down, this.handlerMoveFigure(Direction.Down));
    this.keyBindings.setHandler(KeyBindingsSlot.Top, this.handlerRotateFigure());
  }

  public async run(): Promise<void> {
    this.render.draw(this.screenHistory);

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
    this.render.draw(resultScreen);
  }

  private refreshFigure(): void {
    const randomizeNumber = Number.parseInt((Math.random() * this.figures.length).toString());
    this.currentFigure = new this.figures[randomizeNumber]();
  }

  private mappingToScreen(figure: Figure, screenHistory: RenderPixelMatrix): RenderPixelMatrix {
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
