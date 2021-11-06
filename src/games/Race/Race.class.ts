import { Game } from '../Game.abstract';
import { Render } from '../../Render.class';
import { BrickGame } from '../../BrickGame.class';
import { KeyController } from '../../KeyController.class';

export class Race extends Game {
    constructor(render: Render, brickGame: BrickGame, keyController: KeyController) {
        super(render, brickGame, keyController);
    }
    public run() {}
}
