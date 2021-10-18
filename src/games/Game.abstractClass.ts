import { BGScreen, Render } from '../Render.class';

export abstract class Game {
    private screen: BGScreen;

    protected constructor(private render: Render) {
        this.screen = Array.from({ length: 20 }, (_) => Array.from({ length: 10 }, (_) => 0));
    }

    abstract run(): void;
}