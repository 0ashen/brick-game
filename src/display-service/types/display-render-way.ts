export interface DisplayRenderWay {
  drawMatrix(screen: Array<Array<0 | 1>>): void;
  drawScore(score: number): void;
}
