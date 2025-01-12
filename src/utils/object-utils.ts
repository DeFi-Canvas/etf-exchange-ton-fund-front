export const getKeyO =
    <T, K extends keyof T>(key: K) =>
    (obj: T): T[K] =>
        obj[key];
