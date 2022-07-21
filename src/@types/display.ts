export interface Display {
  drawMatrix(newScreen: Array<Array<0 | 1>>): void
  drawScore(score: number): void
  drawPause(pause: boolean): void
}
