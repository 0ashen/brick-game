import { Screen } from '../../Render.class';
import _ from 'lodash';
import { figureHorizontalStartPosition } from './Tetris.class';

type Position = { x: number; y: number };
export type Relief = Array<[number, number]>;

export enum Direction {
    Left,
    Right,
    Down
}

export type RotatePoss = 0 | 1 | 2 | 3;

export abstract class Figure {
    private _pos: Position = { x: figureHorizontalStartPosition, y: 0 };
    private _rotate: RotatePoss = 0;
    private _isDead: boolean = false;

    protected constructor(private _relief: Relief) {}

    public get relief(): Relief {
        if (this._isDead) return [];
        return this.getReliefWithRotate(this._relief, this.rotate);
    }

    protected get rotate(): RotatePoss {
        return this._rotate;
    }

    private set rotate(newRotatePos: RotatePoss) {
        this._rotate = newRotatePos;
    }

    public get pos(): Position {
        return this._pos;
    }

    public canMoveTo(direction: Direction, screenHistory: Screen): boolean {
        let xModificator = 0;
        xModificator += direction === Direction.Left ? -1 : 0;
        xModificator += direction === Direction.Right ? 1 : 0;
        const yModificator = direction === Direction.Down ? 1 : 0;

        for (const [x, y] of this.relief) {
            // skip, if figure upper than screen
            if (this.pos.y + y + yModificator < 0) {
                continue;
            }
            const col = screenHistory[this.pos.y + y + yModificator];
            if (col === undefined) return false;
            const row = col[this.pos.x + x + xModificator];

            if (row === undefined || row === 1) return false;
        }

        return true;
    }

    private getReliefWithRotate(relief: Relief, nextRotatePos: RotatePoss): Relief {
        const _relief = _.cloneDeep(relief);

        if (nextRotatePos === 0) return _relief;

        return _relief.map(([x, y]) => {
            if (nextRotatePos === 1) {
                return [y * -1, x];
            }
            if (nextRotatePos === 2) {
                return [x * -1, y * -1];
            }
            if (nextRotatePos === 3) {
                return [y, x * -1];
            }

            return [x, y];
        });
    }

    protected canRotate(screenHistory: Screen): boolean {
        for (const [x, y] of this.getReliefWithRotate(this._relief, this.getNextRotatePos)) {
            const col = screenHistory[this.pos.y + y];
            if (col === undefined) return false;
            const row = col[this.pos.x + x];

            if (row === undefined || row === 1) return false;
        }

        return true;
    }

    public makeRotate(screenHistory: Screen): void {
        if (this.canRotate(screenHistory)) {
            this.rotate = this.getNextRotatePos;
        }
    }

    protected get getNextRotatePos(): RotatePoss {
        if (this.rotate === 0) return 1;
        if (this.rotate === 1) return 2;
        if (this.rotate === 2) return 3;
        if (this.rotate === 3) return 0;
        return 0;
        // return this._rotate + 1 < 4 ? this._rotate + 1 : 0;
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
            }
        }
    }

    public markAsDead() {
        this._isDead = true;
    }
}
