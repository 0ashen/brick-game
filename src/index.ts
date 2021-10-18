import { BrickGame } from './BrickGame.class';
import { Render } from './Render.class';
import { Tetris } from './games/Tetris.class';
import { SimpleRender } from './visualizers/Simple.class';
import { Game } from './games/Game.abstractClass';
import { React } from './visualizers/React/React.class';
import "../public/style.scss";

const render = new Render(
    [
        React,
        SimpleRender,
    ],
);

const games: Game[] = [
    Tetris,
].map(Class => new Class(render));

const brickGame = new BrickGame(
    render,
    games,
);

brickGame.start();