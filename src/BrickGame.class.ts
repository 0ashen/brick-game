import { Render } from './Render.class';
import { Game, GameSignature } from './games/Game.abstract';
import { container, inject, singleton } from 'tsyringe';
import { RegisteredValues } from './RegisteredValues.enum';

@singleton()
export class BrickGame {
    private selectedGame: Game;

    constructor(
        private render: Render,
        @inject(RegisteredValues.Games) private games: GameSignature[]
    ) {
        this.selectedGame = container.resolve(this.games[0]);
    }

    public start() {
        this.selectedGame.run();
    }
}
