import cn from 'classnames';
import css from './fund.module.css';
// import ChartInvestedCard from './components/invested-card/invested-card.component';
import CardAuthor from './components/author/card-author.component';
import { injectable, token } from '@injectable-ts/core';
import { AboutContainer } from './components/chart-about/about.container';
import { WhatInsideContainer } from './components/what-inside/what-inside.container';
import AppFooter from '@/components/app-footer/app-footer.components';
import TermsAndConditions from '@/components/terms-and-conditions/terms-and-conditions.components';
import { FooterContainer } from './components/footer/footer.container';
import { ChartLinesContainer } from './components/lines/lines.container';
import { MoreInfoContainer } from './components/more-info/more-info.componentcontainer';
import * as E from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import SkeletonCard from '@/components/skeletons/skeleton-card/skeleton-card.component';
import { FundsData } from '@/instance/fund/fund.model';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

interface FundPageProps {
    fund: E.Either<string, FundsData>;
}

export const FundPage = injectable(
    AboutContainer,
    WhatInsideContainer,
    FooterContainer,
    ChartLinesContainer,
    MoreInfoContainer,
    token('i18n')<I18NService>(),
    (
        AboutContainer,
        WhatInsideContainer,
        FooterContainer,
        ChartLinesContainer,
        MoreInfoContainer,
        i18n
    ) =>
        ({ fund }: FundPageProps) => {
            const { Fund } = useProperty(i18n.WhatToBuy);
            return (
                <div className={cn('app-container', css.page)}>
                    <RenderResult
                        data={fund}
                        loading={() => <SkeletonCard type={'small'} />}
                        success={({ logo, name }) => (
                            <div className={css.foundCard}>
                                <img
                                    src={logo}
                                    className={css.foundCardImage}
                                />
                                {name}
                            </div>
                        )}
                    />
                    <ChartLinesContainer />
                    {/* <ChartInvestedCard /> */}
                    <AboutContainer />
                    <WhatInsideContainer />
                    <MoreInfoContainer />
                    <CardAuthor authorTitle={Fund.authorTitle} />
                    <AppFooter>
                        <FooterContainer />
                    </AppFooter>
                    <TermsAndConditions />
                </div>
            );
        }
);
