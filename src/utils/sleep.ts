export const sleep = (time: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(undefined);
        }, time);
    });
};
