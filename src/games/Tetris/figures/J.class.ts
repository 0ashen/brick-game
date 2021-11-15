import { Figure, Relief } from '../Figure.abstract';

export class J extends Figure {
    constructor() {
        const relief: Relief = [
            [0, 0],
            [0, -1],
            [1, 0],
            [2, 0]
        ];
        super(relief);
    }
}
