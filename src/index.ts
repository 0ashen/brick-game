import 'reflect-metadata';
import { container } from 'tsyringe';
import { Display, Game, KeyBindings } from '~/@types';
import { DisplayService } from '~/display';
import { KeyBindingsService } from '~/key-bindings';
import { Race } from '~/race';
import { Tetris } from '~/tetris';
import { cancelScrollOnPressArrows } from '~/utils';
import '../public/style.scss';
import { BrickGame } from './brick-game';

// prepare
cancelScrollOnPressArrows();

container
  .register<Display>('Display', DisplayService)
  .register<KeyBindings>('Bindings', KeyBindingsService)
  .register<Array<() => Game>>('GameList', {
    useValue: [
      () => container.resolve(Tetris),
      () => container.resolve(Race),
    ],
  });

// run
const brickGame = container.resolve(BrickGame);

brickGame.start();
