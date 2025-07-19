import { token } from '@injectable-ts/core';

export interface UserData {
    allowsWriteToPm?: boolean;
    firstName?: string;
    id?: number;
    isPremium?: boolean;
    languageCode?: string;
    lastName?: string;
    username?: string;
}

export const UserData = token('userData')<UserData>();
