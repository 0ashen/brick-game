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

type Keys = {
    [Buttons.Top]: string;
    [Buttons.Right]: string;
    [Buttons.Down]: string;
    [Buttons.Left]: string;
    [Buttons.Rotate]: string;
    [Buttons.OnOff]: string;
    [Buttons.StartPause]: string;
    [Buttons.Sound]: string;
    [Buttons.Reset]: string;
};

type KeyBindings = {
    [key in keyof Keys]: (() => void)[];
};

export class KeyController {
    private static instance: KeyController;
    private keys: Keys = {
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

    private constructor() {
        this.keyBindings = (Object.keys(this.keys) as (keyof Keys)[]).reduce<KeyBindings>(
            (acc: KeyBindings, key) => {
                acc[key] = [];
                return acc;
            },
            {} as KeyBindings
        );
        const keys = this.keys;
        document.onkeydown = ({ key: pressedKey }) => {
            (Object.entries(this.keys) as Array<[keyof Keys, keyof typeof keys]>).forEach(
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
    public static getInstance(): KeyController {
        if (!KeyController.instance) {
            KeyController.instance = new KeyController();
        }

        return KeyController.instance;
    }
}
