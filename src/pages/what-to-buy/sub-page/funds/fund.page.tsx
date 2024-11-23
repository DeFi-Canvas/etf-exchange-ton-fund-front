import cn from 'classnames';
import css from './fund.module.css';
import ChartLines from './components/lines/lines.component';
import ChartInvestedCard from './components/invested-card/invested-card.component';
import ChartAbout from './components/chart-about/about.component';
import ChartWhatInside from './components/what-inside/what-inside.component';
import ChartMoreInfo from './components/more-info/more-info.component';
import ChartCardAuthor from './components/author/card-author.component';
import ChartFooter from './components/footer/footer.component';

export const FundPage = () => {
    return (
        <div className={cn('app-container', css.page)}>
            <div className={css.foundCard}>
                <img src="temp-asset-card-avatar.png" />
                Canvas Stable
            </div>
            <ChartLines />
            <ChartInvestedCard />
            <ChartAbout />
            <ChartWhatInside />
            <ChartMoreInfo />
            <ChartCardAuthor />
            <ChartFooter />
            <div className={css.termsCondition}>Terms & conditions</div>
        </div>
    );
};
