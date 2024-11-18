import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import css from './withdrow.module.css';
import { AssetsContainer } from '../deposit/assets/assets.container';
import { injectable } from '@injectable-ts/core';
import cn from 'classnames';

export const Withdrow = injectable(AssetsContainer, (AssetsContainer) => () => {
    return (
        <div className={css.page}>
            <div className={cn('app-container', css.pageHeader)}>
                <h2 className={css.pageTitle}>Withdrow</h2>
                <SerchInput placeholder="Search" />
            </div>
            <div className={css.assetsWrapper}>
                <AssetsContainer type="withdrow" />
            </div>
        </div>
    );
});
