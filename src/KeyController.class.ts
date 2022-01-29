import { singleton } from 'tsyringe';

export enum Buttons {
    Top = 'Top',
    Right = 'Right',
    Down = 'Down',
    Left = 'Left',
    Rotate = 'Rotate',
    OnOff = 'OnOff',
    StartPause = 'StartPause',
    Sound = 'Sound',
    Reset = 'Reset'
}

type KeysMatch = {
    [key in Buttons]: string;
};

type KeyBindings = {
    [key in keyof KeysMatch]: (() => void)[];
};

@singleton()
export class KeyController {
    private keysMatch: KeysMatch = {
        [Buttons.Top]: 'ArrowUp',
        [Buttons.Right]: 'ArrowRight',
        [Buttons.Down]: 'ArrowDown',
        [Buttons.Left]: 'ArrowLeft',
        [Buttons.Rotate]: ' ',
        [Buttons.OnOff]: 'o',
        [Buttons.StartPause]: 'p',
        [Buttons.Sound]: 's',
        [Buttons.Reset]: 'r'
    };
    private keyBindings: KeyBindings;

    constructor() {
        this.keyBindings = (Object.keys(this.keysMatch) as (keyof KeysMatch)[]).reduce<KeyBindings>(
            (acc: KeyBindings, key) => {
                acc[key] = [];
                return acc;
            },
            {} as KeyBindings
        );
        const keys = this.keysMatch;
        document.onkeydown = ({ key: pressedKey }) => {
            (Object.entries(this.keysMatch) as Array<[keyof KeysMatch, keyof typeof keys]>).forEach(
                ([key, value]) => {
                    if (value === pressedKey) {
                        this.keyBindings[key].forEach((func) => func());
                    }
                }
            );
        };
    }

    public setHandler(button: Buttons, func: () => void) {
        this.keyBindings[button].push(func);
    }
}
