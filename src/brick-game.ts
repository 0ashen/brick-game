import { inject, singleton } from 'tsyringe';
import { Game, KeyBind, KeyBindSlot } from '~/@types';

@singleton()
export class BrickGame {
  private selectedGame!: Game;

  constructor(
    @inject('GameList') private games: Array<() => Game>,
    @inject('Bindings') private keyBindService: KeyBind,
  ) {
    this.selectedGame = this.games[0]();
    this.keyBindService.bindHandler(KeyBindSlot.StartPause, () => {
      this.selectedGame.doPause();
    });
  }

  public start() {
    this.selectedGame.run();
  }

}
