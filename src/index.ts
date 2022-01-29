import 'reflect-metadata';
import { container } from 'tsyringe';
import '../public/style.scss';
import { BrickGame } from './BrickGame.class';
import { Race } from './games/Race/Race.class';
import { Tetris } from './games/Tetris/Tetris.class';
import { RegisteredValues } from './RegisteredValues.enum';
import { SimpleRender } from './visualizers/Simple.class';
import { React } from './visualizers/React/React.class';
import { Visualizer } from './visualizers/Visualizer.interface';
import { Game } from './games/Game.abstract';

container.register<typeof Game[]>(RegisteredValues.Games, {
    useValue: [Tetris, Race]
});
container.register<typeof Visualizer[]>(RegisteredValues.Visualizers, {
    useValue: [React, SimpleRender]
});

const brickGame = container.resolve(BrickGame);

brickGame.start();
