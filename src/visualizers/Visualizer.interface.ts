import { Screen } from '../Render.class';

export abstract class Visualizer {
    abstract render(screen: Screen): void;
}

export type VisualizerSignature = {
    new (screen: Screen): void;
};
