import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { AssetsViewModelInit, newAssetsViewModel } from './assets.view-model';
import { useProperty } from '@frp-ts/react';
import React from 'react';
import { Assets } from './assets.component';
import { injectable, provide, token } from '@injectable-ts/core';
import { UserStoreService } from '@/store/user.store';
import { newNewWithdrowStore } from '@/pages/withdrow/withdrow.store';

interface AssetsContainerProps {
    type: AssetsViewModelInit;
}

export const AssetsContainer = injectable(
    // newAssetsViewModel,
    token('userStore')<UserStoreService>(),
    provide(newAssetsViewModel)<'withdrowStore'>(),
    (userStore, newAssetsViewModel) =>
        ({ type }: AssetsContainerProps) => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                []
            );

            const vm = useValueWithEffect(
                () => newAssetsViewModel({ withdrowStore })(type),
                [type]
            );
            const assets = useProperty(vm.assets);
            const handleClick = vm.handleClick;
            return React.createElement(Assets, { assets, type, handleClick });
        }
);
