import { Visualizer } from './visualizers/Visualizer.interface';
import _ from 'lodash';

export type BGScreen = Array<(0 | 1)[]>

export class Render {
    private _screen: BGScreen;
    private currentVisualizer: any;

    constructor(
        private visualizers: Array<{ new(): Visualizer }>,
    ) {

        this._screen = Array.from({ length: 20 }, (_) => Array.from({ length: 10 }, (_) => 0));
        this.currentVisualizer = new visualizers[0];
    }

    public set screen(screen: BGScreen) {
        if (_.isEqual(this._screen, screen)) return;
        this._screen = screen;
        this.draw();
    }

    private draw() {
        this.currentVisualizer.render(this._screen);
    }
}