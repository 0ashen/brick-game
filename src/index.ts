import 'reflect-metadata';
import { container } from 'tsyringe';
import { Draw, Game } from '~/@types';
import { cancelScrollOnPressArrows } from '~/utils';
import '../public/style.scss';
import { BrickGame } from './brick-game';
import { Race, Tetris } from '~/games';
import { Render } from '~/render';

// prepare
cancelScrollOnPressArrows();

container
  .register<Draw>('Draw', Render)
  .register<Array<Game>>('Game', {
    useValue: [
      container.resolve(Tetris),
      container.resolve(Race),
    ],
  })

// run
const brickGame = container.resolve(BrickGame);

brickGame.start();
