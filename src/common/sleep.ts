export function sleep(millies: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, millies)
    });
}
