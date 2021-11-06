import { Render } from '../Render.class';
import { BrickGame } from '../BrickGame.class';
import { KeyController } from '../KeyController.class';

export abstract class Game {
    protected constructor(
        protected render: Render,
        protected brickGame: BrickGame,
        protected keyController: KeyController
    ) {}

    abstract run(): void;
}

export type GameSignature = {
    new (render: Render, brickGame: BrickGame, keyController: KeyController): Game;
};
