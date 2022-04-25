import { Screen } from '../services/Render/Render';

export abstract class Visualizer {
  abstract render(screen: Screen): void;
}

export type VisualizerSignature = {
  new (screen: Screen): void;
};
