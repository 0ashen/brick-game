import { DisplayMatrix20x10 } from '~/@types';

export const cookEmptyScreen = (): DisplayMatrix20x10 => {
  return Array.from({ length: 20 }, (_) => Array.from({ length: 10 }, (_) => 0)) as DisplayMatrix20x10
};
