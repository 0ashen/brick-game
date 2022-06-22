import { singleton } from 'tsyringe';
import { KeyBindings, KeyBindingsSlot } from '~/@types';
import { KeyBindingsBindedButton, KeyBindingsHandler } from './types';

@singleton()
export class KeyBindingsService implements KeyBindings {
  private mapSlot2Key: Record<KeyBindingsSlot, KeyBindingsBindedButton> = {
    [KeyBindingsSlot.Top]: 'ArrowUp',
    [KeyBindingsSlot.Right]: 'ArrowRight',
    [KeyBindingsSlot.Down]: 'ArrowDown',
    [KeyBindingsSlot.Left]: 'ArrowLeft',
    [KeyBindingsSlot.Rotate]: ' ',
    [KeyBindingsSlot.OnOff]: 'o',
    [KeyBindingsSlot.StartPause]: 'p',
    [KeyBindingsSlot.Sound]: 's',
    [KeyBindingsSlot.Reset]: 'r',
  };
  private mapSlot2Handler: Record<KeyBindingsSlot, Array<KeyBindingsHandler>> = {
    [KeyBindingsSlot.Top]: [],
    [KeyBindingsSlot.Down]: [],
    [KeyBindingsSlot.Left]: [],
    [KeyBindingsSlot.Right]: [],
    [KeyBindingsSlot.Reset]: [],
    [KeyBindingsSlot.Rotate]: [],
    [KeyBindingsSlot.OnOff]: [],
    [KeyBindingsSlot.StartPause]: [],
    [KeyBindingsSlot.Sound]: [],
  };

  constructor() {
    document.onkeydown = ({ key: pressedKey }) => {
      const slotKeyPars = Object.entries(this.mapSlot2Key) as Array<[KeyBindingsSlot, KeyBindingsBindedButton]>;
      slotKeyPars.forEach(([slot, boundKey]) => {
        if (boundKey === pressedKey) {
          this.mapSlot2Handler[slot].forEach((handler) => handler());
        }
      });
    };
  }

  public bind(button: KeyBindingsSlot, handler: KeyBindingsHandler) {
    this.mapSlot2Handler[button].push(handler);
  }
}

