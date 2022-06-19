import { RenderPixelMatrix } from '~/render';

export const cookEmptyScreen = (): RenderPixelMatrix => {
  return Array.from({ length: 20 }, (_) => Array.from({ length: 10 }, (_) => 0)) as RenderPixelMatrix;
};
