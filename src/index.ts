import 'reflect-metadata';
import { container } from 'tsyringe';
import '../public/style.scss';
import { BrickGame } from './BrickGame.class';

const brickGame = container.resolve(BrickGame);

brickGame.start();
