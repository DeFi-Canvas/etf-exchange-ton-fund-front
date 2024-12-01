import { Crumbs } from '@/components/crumbs/crumbs.component';
import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import css from './funds.module.css';
import cn from 'classnames';
import { FondsWrapContainer } from '../../components/funds/funds.container';
import { injectable } from '@injectable-ts/core';

export const Funds = injectable(
    FondsWrapContainer,
    (FondsWrapContainer) => () => {
        return (
            <div className={cn('app-container', css.wrap)}>
                <span className={css.title}>Funds</span>
                <SerchInput placeholder={'Search'} theme={css.serch} />
                <div className={css.crumbs}>
                    <Crumbs title="Popular" to={'/'} />
                    <Crumbs title="New" to={'/'} />
                    <Crumbs title="Low risk" to={'/'} />
                    <Crumbs title="Medium Risk" to={'/'} />
                    <Crumbs title="High Risk" to={'/'} />
                </div>
                <FondsWrapContainer />
            </div>
        );
    }
);
