import { inject, singleton } from 'tsyringe';
import { Game } from '~/@types';
import { Render } from '~/render';

@singleton()
export class BrickGame {
  private selectedGame?: Game;

  constructor(
    private render: Render,
    @inject('Game') private games: Array<Game>,
  ) {

  }

  public start() {
    this.selectedGame = this.games[0];

    this.selectedGame.run();
  }
}
