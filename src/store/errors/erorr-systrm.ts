export type Pending = 'PENDING';
export type Loading = 'LOADING';
export type Empty = 'EMPTY';
export type SimpleError = 'ERROR';
export type NetworkError = 'NETWORK_ERROR';

export type Errors =
    | Pending
    | SimpleError
    | NetworkError
    | Loading
    | Empty
    | (string & {});

export const PENDING: Errors = 'PENDING';
export const LOADING: Errors = 'LOADING';
export const EMPTY: Errors = 'EMPTY';
export const ERROR: Errors = 'ERROR';
export const NETWORK_ERROR: Errors = 'NETWORK_ERROR';
