import { inject, singleton } from 'tsyringe';
import { Game } from '~/@types';

@singleton()
export class BrickGame {
  private selectedGame?: Game;

  constructor(
    @inject('GameList') private games: Array<() => Game>,
  ) {

  }

  public start() {
    this.selectedGame = this.games[0]();

    this.selectedGame.run();
  }
}
