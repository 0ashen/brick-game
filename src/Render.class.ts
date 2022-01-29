import _ from 'lodash';
import { injectable, injectAll } from 'tsyringe';
import { Visualizer } from './visualizers/Visualizer.interface';
import { createEmptyScreen } from './utils/createEmptyScreen';
import { React } from './visualizers/React/React.class';

type Pixel = 0 | 1;
export type PixelRow = [Pixel, Pixel, Pixel, Pixel, Pixel, Pixel, Pixel, Pixel, Pixel, Pixel];
export type Screen = [
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow,
    PixelRow
];

@injectable()
export class Render {
    private _screen: Screen;
    private currentVisualizer: Visualizer;

    constructor(@injectAll(React) visualizers: React /*React, SimpleRender*/[]) {
        this._screen = createEmptyScreen();
        this.currentVisualizer = visualizers[0];
    }

    public start(screen: Screen) {
        this._screen = _.cloneDeep(screen);
        this.currentVisualizer.render(this._screen);
    }

    public draw(screen: Screen) {
        if (_.isEqual(this._screen, screen)) return;
        this._screen = _.cloneDeep(screen);
        this.currentVisualizer.render(this._screen);
    }
}
