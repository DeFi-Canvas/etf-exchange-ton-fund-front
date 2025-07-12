import { Stream } from '@most/types';
import * as E from 'fp-ts/lib/Either';
import { EranStep } from '@/pages/profile/components/earn/earn.view-model';
import { DOMAIN_API_URL } from './API';
import { TasksApi } from './scheme/rest-genereted/api';
import { Configuration } from './scheme/rest-genereted';
import { Error } from '@/store/errors/error-system';
import { now } from '@most/core';

const tasksApi = new TasksApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export interface Tasks {
    TelegramID: number;
    ID: string;
    Title: string;
    Url: string;
    Reward: number;
    Completed: boolean;
    ChannelID: number;
}

export interface TasksCheck {
    success: boolean;
    message: string;
}

export interface TasksCheckResponce extends TasksCheck {
    id: string;
}

export interface ProfileRestService {
    getTask: () => Stream<E.Either<Error, Array<EranStep>>>;
    checkTask: (id: string) => Stream<TasksCheckResponce>;
}

export const newProfileRestService = (): ProfileRestService => {
    return {
        getTask: () => now(E.left('EMPTY')),
        checkTask: (id) => now({ success: true, message: '', id }),
    };
};
