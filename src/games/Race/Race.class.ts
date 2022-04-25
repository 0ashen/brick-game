import { Game } from '../../interfaces/Game.abstract';
import { Render } from '../../services/Render/Render';
import { BrickGame } from '../../BrickGame';
import { KeyboardBindings } from '../../services/KeyBindings';
import { delay, inject, injectable } from 'tsyringe';

@injectable()
export class Race extends Game {
    constructor(
        render: Render,
        @inject(delay(() => BrickGame)) brickGame: BrickGame,
        keyController: KeyboardBindings
    ) {
        super(render, brickGame, keyController);
    }

    public run() {}
}
