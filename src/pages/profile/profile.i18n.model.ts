export interface ProfileI18n {
    settings: {
        title: string;
        language: {
            title: string;
            value: string;
        };
        currency: {
            title: string;
            value: string;
        };
    };
    earn: {
        title: string;
    };
    withdraw: {
        title: string;
        linkLabel: string;
    };
}
