import { RenderPixelMatrix } from '~/render';

export interface Draw {
  draw(newScreen: RenderPixelMatrix): void
}
