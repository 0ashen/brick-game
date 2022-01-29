import { Game } from '../Game.abstract';
import { Render } from '../../Render.class';
import { BrickGame } from '../../BrickGame.class';
import { KeyController } from '../../KeyController.class';
import { delay, inject, injectable } from 'tsyringe';

@injectable()
export class Race extends Game {
    constructor(
        render: Render,
        @inject(delay(() => BrickGame)) brickGame: BrickGame,
        keyController: KeyController
    ) {
        super(render, brickGame, keyController);
    }

    public run() {}
}
