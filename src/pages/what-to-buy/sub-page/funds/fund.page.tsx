import cn from 'classnames';
import css from './fund.module.css';
import ChartLines from './components/lines/lines.component';
// import ChartInvestedCard from './components/invested-card/invested-card.component';
import ChartMoreInfo from './components/more-info/more-info.component';
import ChartCardAuthor from './components/author/card-author.component';
import { injectable } from '@injectable-ts/core';
import { AboutContainer } from './components/chart-about/about.container';
import { WhatInsideContainer } from './components/what-inside/what-inside.container';
import TermsAndConditions from '@/components/terms-and-conditions/terms-and-conditions.components.tsx';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { useNavigate, useParams } from 'react-router-dom';

interface FundPageProps {
    name: string;
    logo: string;
}

export const FundPage = injectable(
    AboutContainer,
    WhatInsideContainer,
    (AboutContainer, WhatInsideContainer) =>
        ({ name, logo }: FundPageProps) => {
            const { id } = useParams();
            const navigate = useNavigate();

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
                    <ChartMoreInfo />
                    <ChartCardAuthor />
                    <AppFooter>
                        <AppButton
                            label="Buy"
                            onClick={() => navigate(`/what-to-buy/purchase/${id}`)}
                        />
                    </AppFooter>
                    <TermsAndConditions />
                </div>
            );
        }
);
