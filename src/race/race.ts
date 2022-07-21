import { inject, injectable } from 'tsyringe';
import { Display, Game, KeyBind } from '~/@types';

@injectable()
export class Race implements Game {
  constructor(
    @inject('Display') private renderService: Display,
    @inject('Bindings') private keyBindService: KeyBind,
  ) {
  }

  public doPause() {
  }

  public run() {
  }
}
