export const cookEmptyScreen = (): Array<Array<0 | 1>> => {
  return Array.from({ length: 20 }, (_) => Array.from({ length: 10 }, (_) => 0)) as Array<Array<0 | 1>>;
};
