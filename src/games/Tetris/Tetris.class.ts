import { Game } from '../Game.abstract';
import { Render, Screen } from '../../Render.class';
import _ from 'lodash';
import { Direction, Figure } from './Figure.abstract';
import { I } from './figures/I.class';
import { J } from './figures/J.class';
import { L } from './figures/L.class';
import { Q } from './figures/Q.class';
import { S } from './figures/S.class';
import { T } from './figures/T.class';
import { Z } from './figures/Z.class';
import { sleep } from '../../utils/sleep';
import { createEmptyScreen } from '../../utils/createEmptyScreen';
import { BrickGame } from '../../BrickGame.class';
import { Buttons, KeyController } from '../../KeyController.class';
import { delay, inject, injectable } from 'tsyringe';

type FiguresSet = { new (): Figure }[];

export const TetrisConfig = {
    figureHorizStartPosition: 4
};

@injectable()
export class Tetris extends Game {
    private readonly figures: FiguresSet;
    private currentFigure!: Figure;
    private screenHistory: Screen;

    constructor(
        render: Render,
        @inject(delay(() => BrickGame)) brickGame: BrickGame,
        keyController: KeyController,
    ) {
        super(render, brickGame, keyController);
        this.figures = [T, I, J, L, Q, S, Z];
        this.refreshFigure();
        this.screenHistory = createEmptyScreen();

        keyController.setHandler(Buttons.Left, this.handlerMoveFigure(Direction.Left));
        keyController.setHandler(Buttons.Right, this.handlerMoveFigure(Direction.Right));
        keyController.setHandler(Buttons.Down, this.handlerMoveFigure(Direction.Down));
        keyController.setHandler(Buttons.Top, this.handlerRotateFigure());
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

    public async run(): Promise<void> {
        this.render.start(this.screenHistory);

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

    private renderScreen(renderHistory?: boolean): void {
        const resultScreen = this.mappingToScreen(this.currentFigure, this.screenHistory);
        this.render.draw(resultScreen);
    }

    private refreshFigure(): void {
        const randomizeNumber = Number.parseInt((Math.random() * this.figures.length).toString());
        this.currentFigure = new this.figures[randomizeNumber]();
    }

    private mappingToScreen(figure: Figure, screenHistory: Screen): Screen {
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
