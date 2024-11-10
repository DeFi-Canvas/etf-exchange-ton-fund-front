import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import css from './withdrow.module.css';
import { AssetsContainer } from '../deposit/assets/assets.container';
import { injectable } from '@injectable-ts/core';

export const Withdrow = injectable(AssetsContainer, (AssetsContainer) => () => {
    return (
        <>
            <div className={css.wrap}>
                <h2>Withdrow</h2>
                <SerchInput placeholder="Search" />
                <AssetsContainer type="withdrow" />
            </div>
        </>
    );
});
