import { Render } from './Render.class';
import { Game, GameSignature } from './games/Game.abstract';
import { KeyController } from './KeyController.class';

export class BrickGame {
    private selectedGame: Game;

    constructor(private render: Render, private games: GameSignature[]) {
        this.selectedGame = new games[0](render, this, KeyController.getInstance());
    }

    public start() {
        this.selectedGame.run();
    }
}
