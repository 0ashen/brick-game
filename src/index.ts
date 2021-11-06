import { BrickGame } from './BrickGame.class';
import { Render } from './Render.class';
import { Tetris } from './games/Tetris/Tetris.class';
import { SimpleRender } from './visualizers/Simple.class';
import { React } from './visualizers/React/React.class';
import '../public/style.scss';
import { Race } from './games/Race/Race.class';

const render = new Render([React, SimpleRender]);

const games = [Tetris, Race];

const brickGame = new BrickGame(render, games);

brickGame.start();
