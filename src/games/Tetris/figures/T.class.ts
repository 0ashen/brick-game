import { Figure, Relief } from '../Figure.abstract';

export class T extends Figure {
    constructor() {
        const relief: Relief = [
            [0, 0],
            [-1, 0],
            [1, 0],
            [0, 1]
        ];
        super(relief);
    }
}
