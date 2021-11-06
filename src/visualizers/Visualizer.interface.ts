import { Screen } from '../Render.class';

export abstract class Visualizer {
    abstract render(screen: Screen): void;
}
