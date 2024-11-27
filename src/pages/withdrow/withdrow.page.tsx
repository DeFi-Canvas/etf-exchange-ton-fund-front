import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import css from './withdrow.module.css';
import { AssetsContainer } from '../deposit/assets/assets.container';
import { injectable, provide, token } from '@injectable-ts/core';
import cn from 'classnames';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newNewWithdrowStore } from './withdrow.store';
import { memo } from 'react';

export const Withdrow = injectable(
    token('userStore')<UserStoreService>(),
    provide(AssetsContainer)<'withdrowStore'>(),
    (userStore, AssetsContainer) =>
        memo(() => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                []
            );
            const AssetsContainerResolve = AssetsContainer({
                withdrowStore,
            });
            return (
                <div className={css.page}>
                    <div className={cn('app-container', css.pageHeader)}>
                        <h2 className={css.pageTitle}>Withdraw</h2>
                        <SerchInput placeholder="Search" />
                    </div>
                    <div className={css.assetsWrapper}>
                        <AssetsContainerResolve type="withdrow" />
                    </div>
                </div>
            );
        })
);
