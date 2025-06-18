export type Pending = 'PENDING';
export type Loading = 'LOADING';
export type Empty = 'EMPTY';
export type SimpleError = 'ERROR';
export type NetworkError = 'NETWORK_ERROR';

export type Error =
    | Pending
    | SimpleError
    | NetworkError
    | Loading
    | Empty
    | (string & {});

export const PENDING: Error = 'PENDING';
export const LOADING: Error = 'LOADING';
export const EMPTY: Error = 'EMPTY';
export const ERROR: Error = 'ERROR';
export const NETWORK_ERROR: Error = 'NETWORK_ERROR';
