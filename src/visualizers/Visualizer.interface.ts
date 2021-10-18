import { BGScreen } from '../Render.class';

export abstract class Visualizer {
    abstract render(screen: BGScreen): void
}