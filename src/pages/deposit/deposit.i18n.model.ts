import { JSX } from 'react';

export interface DepositI18n {
    Deposit: {
        title: string;
    };
    EndPoint: {
        title: (
            ticker: string | undefined,
            css: CSSModuleClasses
        ) => JSX.Element;
        address: string;
        tag: string;
        button: string;
    };
}
