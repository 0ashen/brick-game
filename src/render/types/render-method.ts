import { RenderPixelMatrix } from './render-pixel-matrix';

export interface RenderMethod {
  render(screen: RenderPixelMatrix): void;
}
