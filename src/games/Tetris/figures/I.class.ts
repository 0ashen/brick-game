import { Figure, Relief, RotatePoss } from '../Figure.abstract';

export class I extends Figure {
    constructor() {
        const relief: Relief = [
            [-1, 0],
            [0, 0],
            [1, 0],
            [2, 0]
        ];
        super(relief);
    }

    protected get getNextRotatePos(): RotatePoss {
        if (this.rotate === 0) return 1;
        if (this.rotate === 1) return 0;
        return 0;
    }
}