import css from './deposit.module.css';
import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import { injectable, provide, token } from '@injectable-ts/core';
import { AssetsContainer } from './assets/assets.container';
import cn from 'classnames';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newNewWithdrowStore } from '../withdrow/withdrow.store';

export const DepositPageContainer = injectable(
    token('userStore')<UserStoreService>(),
    provide(AssetsContainer)<'withdrowStore'>(),
    (userStore, AssetsContainer) => () => {
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
                    <h2 className={css.pageTitle}>Deposit</h2>
                    <SerchInput placeholder="Search" />
                </div>
                <div className={css.assetsWrapper}>
                    <AssetsContainerResolve type="deposit" />
                </div>
            </div>
        );
    }
);
