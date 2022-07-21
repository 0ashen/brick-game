import { KeyBindSlot } from './key-bind-slot';

export interface KeyBind {
  bindHandler(button: KeyBindSlot, handler: () => void): void;
}
