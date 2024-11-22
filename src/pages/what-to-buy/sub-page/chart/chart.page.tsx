import { Chart } from '@/components/chart/chart.component';
import { constVoid } from 'fp-ts/lib/function';
import cn from 'classnames';
import css from './chart.module.css';

export const ChartPage = () => {
    return (
        <div className={cn('app-container', css.page)}>
            <div className={css.foundCard}>
                <img src="temp-asset-card-avatar.png" />
                Canvas Stable
            </div>
            <div className={css.chartWrapper}>
                <div className={css.chartTabs}>
                    <div className={cn(css.chartTab, {[css.chartTabActive]: true})}>TVL</div>
                    <div className={cn(css.chartTab, {[css.chartTabActive]: false})}>Value</div>
                </div>
                <div className={css.chartLines}>
                    <Chart
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 3, 3, 5, 6]}
                        dateRange={{ from: '4 AUG', to: '4 OCT' }}
                        controlOnClick={constVoid}
                    />
                </div>
            </div>
        </div>
    )
}
