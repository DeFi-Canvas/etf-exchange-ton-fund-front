import cn from 'classnames';
import css from './fund.module.css';
import ChartLines from './components/lines/lines.component';
import ChartInvestedCard from './components/invested-card/invested-card.component';
import ChartMoreInfo from './components/more-info/more-info.component';
import ChartCardAuthor from './components/author/card-author.component';
import ChartFooter from './components/footer/footer.component';
import { injectable } from '@injectable-ts/core';
import { AboutContainer } from './components/chart-about/about.container';
import { WhatInsideContainer } from './components/what-inside/what-inside.container';

interface FundPageProps {
    name: string;
    logo: string;
}

export const FundPage = injectable(
    AboutContainer,
    WhatInsideContainer,
    (AboutContainer, WhatInsideContainer) =>
        ({ name, logo }: FundPageProps) => {
            return (
                <div className={cn('app-container', css.page)}>
                    <div className={css.foundCard}>
                        <img src={logo} className={css.foundCardImage} />
                        {name}
                    </div>
                    <ChartLines />
                    <ChartInvestedCard />
                    <AboutContainer />
                    <WhatInsideContainer />
                    <ChartMoreInfo />
                    <ChartCardAuthor />
                    <ChartFooter />
                    <div className={css.termsCondition}>Terms & conditions</div>
                </div>
            );
        }
);
