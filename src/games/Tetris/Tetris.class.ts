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

type FiguresSet = { new (): Figure }[];

export const figureHorizontalStartPosition = 4;

export class Tetris extends Game {
    private readonly figures: FiguresSet;
    private currentFigure: Figure;
    private screenHistory: Screen;

    constructor(render: Render, brickGame: BrickGame, keyController: KeyController) {
        super(render, brickGame, keyController);
        this.figures = [T, I, J, L, Q, S, Z];
        this.currentFigure = this.randomizeFigure(this.figures);
        this.screenHistory = createEmptyScreen();

        keyController.setHandler(Buttons.Left, this.moveFigure(Direction.Left));
        keyController.setHandler(Buttons.Right, this.moveFigure(Direction.Right));
        keyController.setHandler(Buttons.Down, this.moveFigure(Direction.Down));
        keyController.setHandler(Buttons.Top, this.rotateFigure());
    }

    private moveFigure(to: Direction) {
        return () => {
            this.currentFigure.moveTo(to, this.screenHistory);
            this.updateScreen();
        };
    }

    private rotateFigure() {
        return () => {
            this.currentFigure.makeRotate(this.screenHistory);
            this.updateScreen();
        };
    }

    public async run(): Promise<void> {
        this.render.start(this.screenHistory);

        while (true) {
            this.updateScreen();

            await sleep(500);

            if (this.currentFigure.canMoveTo(Direction.Down, this.screenHistory)) {
                this.currentFigure.moveTo(Direction.Down, this.screenHistory);
            } else {
                this.screenHistory = this.mapping(this.currentFigure, this.screenHistory);
                this.currentFigure = this.randomizeFigure(this.figures);
            }
        }
    }

    private updateScreen(): void {
        const resultScreen = this.mapping(this.currentFigure, this.screenHistory);
        this.render.update(resultScreen);
    }

    private randomizeFigure(figures: FiguresSet): Figure {
        const randomizeNumber = Number.parseInt((Math.random() * figures.length).toString());
        return new figures[randomizeNumber]();
    }

    private mapping(figure: Figure, screenHistory: Screen): Screen {
        const screen = _.cloneDeep(screenHistory);

        for (const [x, y] of figure.relief) {
            // if figure upper than screen, just don't mapping to screen
            if (figure.pos.y + y < 0) {
                continue;
            }
            screen[figure.pos.y + y][figure.pos.x + x] = 1;
        }

        return screen;
    }
}
