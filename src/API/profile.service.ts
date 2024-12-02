import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { EranStep } from '@/pages/profile/components/earn/earn.view-model';
import { getRequestGenerated } from './request.utils';
import { fromPromise } from '@most/core';
import axios from 'axios';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { API, DOMAIN_API_URL } from './API';
import { TasksApi } from './scheme/rest-genereted/api';
import { Configuration } from './scheme/rest-genereted';
import { taskListCodec } from './contracts/task.contract';
// import { taskCompleteResponseCodec } from './contracts/taskComplete.contract';

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
    getTask: () => Stream<Either<string, Array<EranStep>>>;
    checkTask: (id: string) => Stream<TasksCheckResponce>;
}

export const newProfileRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): ProfileRestService => {
        const { id: telegram_id } = userStore.user.get();
        const { initDataRaw } = retrieveLaunchParams();

        //TODO вынести в модель
        const mapGetTask = (d: Tasks): EranStep => ({
            id: d.ID,
            title: d.Title,
            reward: d.Reward,
            isActive: d.Completed,
            externalLink: d.Url,
            isLoading: false,
        });

        return {
            getTask: getRequestGenerated(
                tasksApi.tasksGet(telegram_id ?? 0),
                taskListCodec,
                mapGetTask
            ),
            checkTask: (id) => {
                return fromPromise(
                    axios
                        .post<TasksCheck>(API.checkTask, {
                            telegram_id,
                            task_id: id,
                            init_data: initDataRaw,
                        })
                        .then(({ data }) => ({
                            ...data,
                            success: data.success,
                            id,
                        }))
                        .catch((error) => {
                            throw new Error(error);
                        })
                );
            },
        };
    }
);
