import { KeyBindingsSlot } from './key-bindings-slot';

export interface KeyBindings {
  bind(button: KeyBindingsSlot, handler: () => void): void;
}
