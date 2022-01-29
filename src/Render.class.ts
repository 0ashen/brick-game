import _ from 'lodash';
import { container, inject, singleton } from 'tsyringe';
import { Visualizer } from './visualizers/Visualizer.interface';
import { createEmptyScreen } from './utils/createEmptyScreen';
import { RegisteredValues } from './RegisteredValues.enum';
import { DelayedConstructor } from 'tsyringe/dist/typings/lazy-helpers';

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

@singleton()
export class Render {
    private _screen: Screen;
    private currentVisualizer: Visualizer;

    constructor(
        @inject(RegisteredValues.Visualizers) private visualizers: DelayedConstructor<Visualizer>[]
    ) {
        this._screen = createEmptyScreen();
        this.currentVisualizer = container.resolve(visualizers[0]);
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
