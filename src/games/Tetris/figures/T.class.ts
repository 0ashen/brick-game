import { Figure } from './Figure.abstract';
import { Screen } from '../../../Render.class';

type Position = { x: number; y: number };
type Relief = Array<[number, number]>;

export enum Direction {
    Left,
    Right,
    Down
}

export class T extends Figure {
    private _pos: Position = { x: 4, y: 0 };
    private _relief: Relief = [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, 1]
    ];

    constructor() {
        super();
    }

    public get relief(): Relief {
        return this._relief;
    }

    public get pos(): Position {
        return this._pos;
    }

    public canMoveTo(direction: Direction, screenHistory: Screen): boolean {
        const { x, y } = this.pos;

        let xModificator = 0;
        xModificator += direction === Direction.Left ? -1 : 0;
        xModificator += direction === Direction.Right ? 1 : 0;

        const yModificator = direction === Direction.Down ? 1 : 0;
        for (const [x2, y2] of this.relief) {
            const col = screenHistory[y + y2 + yModificator];
            if (col === undefined) return false;
            const row = col[x + x2 + xModificator];

            if (row === undefined || row === 1) return false;
        }

        return true;
    }

    public moveTo(direction: Direction, screenHistory: Screen): void {
        if (this.canMoveTo(direction, screenHistory)) {
            switch (direction) {
                case Direction.Down:
                    this._pos.y++;
                    break;
                case Direction.Left:
                    this._pos.x--;
                    break;
                case Direction.Right:
                    this._pos.x++;
                    break;
                default:
                    console.log('Sorry, we are out of ' + direction + '.');
            }
        }
    }
}
