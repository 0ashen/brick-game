import { Figure, Relief } from '../Figure.abstract';
import { Screen } from '../../../Render.class';

export class Q extends Figure {
    constructor() {
        const relief: Relief = [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1]
        ];
        super(relief);
    }

    protected canRotate(screenHistory: Screen): boolean {
        return false;
    }
}
