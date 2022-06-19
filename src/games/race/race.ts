import { Draw, Game } from '~/@types';
import { KeyBindings } from '~/key-bindings/key-bindings';
import { inject, injectable } from 'tsyringe';

@injectable()
export class Race implements Game {
  constructor(@inject('Draw') private render: Draw, private keyController: KeyBindings) {
  }

  public run() {
  }
}
