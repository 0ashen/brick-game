export interface Game {
  run(): void | Promise<void>;
  doPause(): void;
  gameOver(): void;
}
