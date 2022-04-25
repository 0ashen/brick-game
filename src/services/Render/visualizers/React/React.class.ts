import { Visualizer } from '../../../../interfaces/Visualizer.interface';
import { Screen } from '../../Render';
import { initReact } from './InitReact';
import { ScreenState } from './Layout';
import _ from 'lodash';
import { singleton } from 'tsyringe';

@singleton()
export class React extends Visualizer {
    private _setState?: React.Dispatch<React.SetStateAction<ScreenState>>;
    private lastScreen?: Screen;

    constructor() {
        super();
        //todo create destructor for react initialization
        initReact(this.setHookDispatch);
    }

    public render(screen: Screen): void {
        this.lastScreen = _.cloneDeep(screen);
        if (this._setState) {
            this._setState(this.lastScreen);
        } else {
            console.log('setState not set');
        }
    }

    private setHookDispatch = (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => {
        this._setState = hookDispatch;
        if (this.lastScreen) {
            this.render(this.lastScreen);
        }
    };
}
