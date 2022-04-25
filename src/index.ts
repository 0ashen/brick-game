import 'reflect-metadata';
import { container } from 'tsyringe';
import '../public/style.scss';
import { BrickGame } from './BrickGame';
import { Race } from './games/Race/Race.class';
import { Tetris } from './games/Tetris/Tetris.class';
import { ModuleSet } from './ModuleSet.enum';
import { SimpleRender } from './services/Render/visualizers/Simple.class';
import { React } from './services/Render/visualizers/React/React.class';
import { Visualizer } from './interfaces/Visualizer.interface';
import { Game } from './interfaces/Game.abstract';
import { depricateScrollOnPressArrow } from './utils/depricateScrollOnPressArrow';

depricateScrollOnPressArrow();

container.register<typeof Game[]>(ModuleSet.Games, {
  useValue: [Tetris, Race]
});
container.register<typeof Visualizer[]>(ModuleSet.Visualizers, {
  useValue: [React, SimpleRender]
});

const brickGame = container.resolve(BrickGame);

brickGame.start();
