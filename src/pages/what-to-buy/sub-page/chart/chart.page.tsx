import cn from 'classnames';
import css from './chart.module.css';
import ChartLines from './components/chart-lines/chart-lines.component';
import ChartInvestedCard from './components/chart-invested-card/chart-invested-card.component';
import ChartAbout from './components/chart-about/chart-about.component';

export const ChartPage = () => {
    return (
        <div className={cn('app-container', css.page)}>
            <div className={css.foundCard}>
                <img src="temp-asset-card-avatar.png" />
                Canvas Stable
            </div>
            <ChartLines />
            <ChartInvestedCard />
            <ChartAbout />
        </div>
    );
};
