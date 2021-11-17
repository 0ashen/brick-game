import { Visualizer } from './visualizers/Visualizer.interface';
import _ from 'lodash';
import { createEmptyScreen } from './utils/createEmptyScreen';

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

export class Render {
    private _screen: Screen;
    private currentVisualizer: Visualizer;

    constructor(private visualizers: Array<{ new (): Visualizer }>) {
        this._screen = createEmptyScreen();
        this.currentVisualizer = new visualizers[0]();
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
