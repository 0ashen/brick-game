import { Visualizer } from '../Visualizer.interface';
import { BGScreen } from '../../Render.class';
import { initReact } from './InitReact';
import { ScreenState } from './Layout';

export class React extends Visualizer {
    private _setState?: React.Dispatch<React.SetStateAction<ScreenState>>;

    constructor() {
        super();
        //todo create destructor for react initialization
        initReact(this.setHookDispatch);
    }

    public render(screen: BGScreen): void {
        if (this._setState) {
            this._setState(screen)
        } else {
            console.log('setState not set');
        }
    }

    public setHookDispatch = (hookDispatch: React.Dispatch<React.SetStateAction<ScreenState>>) => {
        this._setState = hookDispatch;
    };
}


