import { singleton } from 'tsyringe';

export enum KeyBindingsSlot {
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

type Handler = () => void;
type BoundKey = string;

@singleton()
export class KeyboardBindings {
  private mapSlot2Key: Record<KeyBindingsSlot, BoundKey> = {
    [KeyBindingsSlot.Top]: 'ArrowUp',
    [KeyBindingsSlot.Right]: 'ArrowRight',
    [KeyBindingsSlot.Down]: 'ArrowDown',
    [KeyBindingsSlot.Left]: 'ArrowLeft',
    [KeyBindingsSlot.Rotate]: ' ',
    [KeyBindingsSlot.OnOff]: 'o',
    [KeyBindingsSlot.StartPause]: 'p',
    [KeyBindingsSlot.Sound]: 's',
    [KeyBindingsSlot.Reset]: 'r'
  };
  private mapSlot2Handler: Record<KeyBindingsSlot, Array<Handler>> = {
    [KeyBindingsSlot.Top]: [],
    [KeyBindingsSlot.Down]: [],
    [KeyBindingsSlot.Left]: [],
    [KeyBindingsSlot.Right]: [],
    [KeyBindingsSlot.Reset]: [],
    [KeyBindingsSlot.Rotate]: [],
    [KeyBindingsSlot.OnOff]: [],
    [KeyBindingsSlot.StartPause]: [],
    [KeyBindingsSlot.Sound]: []
  };

  constructor() {
    document.onkeydown = ({ key: pressedKey }) => {
      const slotKeyPars = Object.entries(this.mapSlot2Key) as Array<[KeyBindingsSlot, BoundKey]>;
      slotKeyPars.forEach(([slot, boundKey]) => {
        if (boundKey === pressedKey) {
          this.mapSlot2Handler[slot].forEach((handler) => handler());
        }
      });
    };
  }

  public setHandler(button: KeyBindingsSlot, handler: Handler) {
    this.mapSlot2Handler[button].push(handler);
  }
}
