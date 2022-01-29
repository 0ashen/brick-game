import { Render } from './Render.class';
import { Game } from './games/Game.abstract';
import { injectable, injectAll } from 'tsyringe';
import { Tetris } from './games/Tetris/Tetris.class';

@injectable()
export class BrickGame {
    private selectedGame: Game;

    constructor(private render: Render, @injectAll(Tetris) games: Tetris /*Tetris, Race*/[]) {
        this.selectedGame = games[0];
    }

    public start() {
        this.selectedGame.run();
    }
}
