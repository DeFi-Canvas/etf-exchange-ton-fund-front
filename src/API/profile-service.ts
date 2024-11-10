import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { EranStep } from '@/pages/profile/components/earn/earn.view-model';
import { getRequest } from './request.utils';

const DOMAIN_API_URL =
    'https://etf-exchange-ton-fund-back-production.up.railway.app';

const API = {
    getTask: (id: number | undefined) =>
        `${DOMAIN_API_URL}/tasks?telegram_id=${id}`,
};

export interface Tasks {
    TelegramID: number;
    ID: string;
    Title: string;
    Url: string;
    Reward: number;
    Completed: boolean;
    ChannelID: number;
}

export interface ProfileRestService {
    getTask: () => Stream<Either<string, Array<EranStep>>>;
}

export const newProfileRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): ProfileRestService => {
        const { id: telegram_id } = userStore.user.get();

        //TODO вынести в модель
        const mapGetTask = (d: Tasks): EranStep => ({
            id: d.ID,
            title: d.Title,
            reward: d.Reward,
            isActive: d.Completed,
            externalLink: d.Url,
        });

        return {
            getTask: () => getRequest(API.getTask(telegram_id), mapGetTask),
        };
    }
);
