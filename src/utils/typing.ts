export type DeepRequired<T> = {
    [P in keyof T]-?: NonNullable<T[P]> extends (infer U)[]
        ? DeepRequired<NonNullable<U>>[]
        : NonNullable<T[P]> extends object
          ? DeepRequired<NonNullable<T[P]>>
          : NonNullable<T[P]>;
};
