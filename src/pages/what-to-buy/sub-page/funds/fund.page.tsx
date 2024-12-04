import cn from 'classnames';
import css from './fund.module.css';
import ChartLines from './components/lines/lines.component';
// import ChartInvestedCard from './components/invested-card/invested-card.component';
import MoreInfo from './components/more-info/more-info.component';
import CardAuthor from './components/author/card-author.component';
import { injectable } from '@injectable-ts/core';
import { AboutContainer } from './components/chart-about/about.container';
import { WhatInsideContainer } from './components/what-inside/what-inside.container';
import AppFooter from '@/components/app-footer/app-footer.components';
import TermsAndConditions from '@/components/terms-and-conditions/terms-and-conditions.components';
import { FooterContainer } from './components/footer/footer.container';

interface FundPageProps {
    name: string;
    logo: string;
}

export const FundPage = injectable(
    AboutContainer,
    WhatInsideContainer,
    FooterContainer,
    (AboutContainer, WhatInsideContainer, FooterContainer) =>
        ({ name, logo }: FundPageProps) => {
            return (
                <div className={cn('app-container', css.page)}>
                    <div className={css.foundCard}>
                        <img src={logo} className={css.foundCardImage} />
                        {name}
                    </div>
                    <ChartLines />
                    {/* <ChartInvestedCard /> */}
                    <AboutContainer />
                    <WhatInsideContainer />
                    <MoreInfo />
                    <CardAuthor />
                    <AppFooter>
                        <FooterContainer />
                    </AppFooter>
                    <TermsAndConditions />
                </div>
            );
        }
);
