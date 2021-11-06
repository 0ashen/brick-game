import { Screen } from '../Render.class';

export const createEmptyScreen = (): Screen => {
    return Array.from({ length: 20 }, (_) => Array.from({ length: 10 }, (_) => 0)) as Screen;
};
