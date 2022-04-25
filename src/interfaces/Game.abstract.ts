import { Render } from '../services/Render/Render';
import { BrickGame } from '../BrickGame';
import { KeyboardBindings } from '../services/KeyBindings';

export abstract class Game {
  protected constructor(
    protected render: Render,
    protected brickGame: BrickGame,
    protected keyController: KeyboardBindings
  ) {}

  abstract run(): void;
}

export type GameSignature = {
  new (render: Render, brickGame: BrickGame, keyController: KeyboardBindings): Game;
};
