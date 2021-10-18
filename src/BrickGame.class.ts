import { Render } from './Render.class';
import { Game } from './games/Game.abstractClass';

export class BrickGame {
    private selectedGame: Game;

    constructor(private render: Render, private games: Game[]) {
        this.selectedGame = games[0];

    }

    public start() {
        this.selectedGame.run();
    }
}