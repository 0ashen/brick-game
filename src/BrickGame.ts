import { Render } from './services/Render/Render';
import { Game, GameSignature } from './interfaces/Game.abstract';
import { container, inject, singleton } from 'tsyringe';
import { ModuleSet } from './ModuleSet.enum';

@singleton()
export class BrickGame {
    private selectedGame: Game;

    constructor(
        private render: Render,
        @inject(ModuleSet.Games) private games: GameSignature[]
    ) {
        this.selectedGame = container.resolve(this.games[0]);
    }

    public start() {
        this.selectedGame.run();
    }
}
