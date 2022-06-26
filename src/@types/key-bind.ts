import { KeyBindSlot } from './key-bind-slot';

export interface KeyBind {
  bind(button: KeyBindSlot, handler: () => void): void;
}
