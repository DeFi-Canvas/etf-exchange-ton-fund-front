import { Chart } from '@/components/chart/chart.component';
import { constVoid } from 'fp-ts/lib/function';
import css from './lines.module.css';
import cn from 'classnames';
import CardPrice from '../price/price.components';

const ChartLines = () => {
    return (
        <div className={css.chartWrapper}>
            <div className={css.chartTabs}>
                <div
                    className={cn(css.chartTab, { [css.chartTabActive]: true })}
                >
                    TVL
                </div>
                <div
                    className={cn(css.chartTab, {
                        [css.chartTabActive]: false,
                    })}
                >
                    Value
                </div>
            </div>
            <CardPrice className={css.cardPrice} />
            <div className={css.chartLines}>
                <Chart
                    data={[1, 3, 2, 6, 5, 8]}
                    dateRange={{ from: '4 AUG', to: '4 OCT' }}
                    controlOnClick={constVoid}
                />
            </div>
        </div>
    );
};

export default ChartLines;
