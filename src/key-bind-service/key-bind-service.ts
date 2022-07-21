import { singleton } from 'tsyringe';
import { KeyBind, KeyBindSlot } from '~/@types';
import { KeyBindButtonBinded, KeyBindHandler } from './types';

@singleton()
export class KeyBindService implements KeyBind {
  private mapSlot2Key: Record<KeyBindSlot, KeyBindButtonBinded> = {
    [KeyBindSlot.Top]: 'ArrowUp',
    [KeyBindSlot.Right]: 'ArrowRight',
    [KeyBindSlot.Down]: 'ArrowDown',
    [KeyBindSlot.Left]: 'ArrowLeft',
    [KeyBindSlot.Rotate]: ' ',
    [KeyBindSlot.OnOff]: 'o',
    [KeyBindSlot.StartPause]: 'p',
    [KeyBindSlot.Sound]: 's',
    [KeyBindSlot.Reset]: 'r',
  };
  private mapSlot2Handler: Record<KeyBindSlot, Array<KeyBindHandler>> = {
    [KeyBindSlot.Top]: [],
    [KeyBindSlot.Down]: [],
    [KeyBindSlot.Left]: [],
    [KeyBindSlot.Right]: [],
    [KeyBindSlot.Reset]: [],
    [KeyBindSlot.Rotate]: [],
    [KeyBindSlot.OnOff]: [],
    [KeyBindSlot.StartPause]: [],
    [KeyBindSlot.Sound]: [],
  };

  constructor() {
    document.onkeydown = ({ key: pressedKey }) => {
      const slotKeyPars = Object.entries(this.mapSlot2Key) as Array<[KeyBindSlot, KeyBindButtonBinded]>;
      slotKeyPars.forEach(([slot, boundKey]) => {
        if (boundKey === pressedKey) {
          this.mapSlot2Handler[slot].forEach((handler) => handler());
        }
      });
    };
  }

  public bindHandler(button: KeyBindSlot, handler: KeyBindHandler) {
    this.mapSlot2Handler[button].push(handler);
  }
}

