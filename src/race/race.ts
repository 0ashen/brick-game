import { inject, injectable } from 'tsyringe';
import { Display, Game, KeyBindings } from '~/@types';

@injectable()
export class Race implements Game {
  constructor(
    @inject('Display') private renderService: Display,
    @inject('Bindings') private keyBindService: KeyBindings,
  ) {
  }

  public run() {
  }
}
