import 'reflect-metadata';
import { container } from 'tsyringe';
import { Display, Game, KeyBind } from '~/@types';
import { DisplayService } from '~/display-service';
import { KeyBindService } from '~/key-bind-service';
import { Race } from '~/race';
import { Tetris } from '~/tetris';
import { cancelScrollOnPressArrows } from '~/utils';
import '../public/style.scss';
import { BrickGame } from './brick-game';

// prepare
cancelScrollOnPressArrows();

container
  .register<Display>('Display', DisplayService)
  .register<KeyBind>('Bindings', KeyBindService)
  .register<Array<() => Game>>('GameList', {
    useValue: [
      () => container.resolve(Tetris),
      () => container.resolve(Race),
    ],
  });

// run
const brickGame = container.resolve(BrickGame);

brickGame.start();
