import { Chart } from '@/components/chart/chart.component.tsx';
import { constVoid } from 'fp-ts/function';
import { CardPrice } from '@/pages/what-to-buy/sub-page/funds/components/price/price.components.tsx';
import css from './assets-single.module.css';
import cn from 'classnames';
import TermsAndConditions from '@/components/terms-and-conditions/terms-and-conditions.components.tsx';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { Either } from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component.tsx';
import { AssetResponseMapping } from '@/pages/assets-single/asset-single.model.ts';

interface MoreInfoItem {
    title: string;
    value: string;
}

interface AssetsSinglePageProps {
    asset: Either<string, AssetResponseMapping>;
    texts: {
        tvl: string;
        about: string;
        marketCap: string;
        volume: string;
        supply: string;
        ath: string;
        button: string;
    };
}

const AssetsSinglePage = ({ asset, texts }: AssetsSinglePageProps) => {
    const moreInfoListMock: MoreInfoItem[] = [
        { title: texts.marketCap, value: '$13.8B' },
        { title: texts.volume, value: '$563.7M' },
        { title: texts.supply, value: '2.5B TON' },
        { title: texts.ath, value: '$8.23' },
    ];

    return (
        <RenderResult
            data={asset}
            success={(asset) => (
                <div className={cn('app-container', css.page)}>
                    <div className={cn(css.card, css.assetCard)}>
                        <img
                            src={asset.imageUrl}
                            className={css.assetCardImage}
                        />
                        <div className={css.assetCardText}>{asset.name}</div>
                    </div>
                    <div
                        className={cn(
                            css.card,
                            css.assetSingleChartWrapper,
                            css.chartWrapper
                        )}
                    >
                        <CardPrice text={{ tvlTitle: texts.tvl }} />
                        <Chart
                            data={[1, 3, 2, 6, 5, 8]}
                            dateRange={{ from: '4 AUG', to: '4 OCT' }}
                            controlOnClick={constVoid}
                        />
                    </div>
                    <div className={cn(css.card, css.aboutCard)}>
                        <h2 className={css.aboutCardTitle}>About</h2>
                        <p className={css.aboutCardText}>{asset.description}</p>
                    </div>
                    <div className={cn(css.card, css.moreInfoCard)}>
                        <h2 className={css.moreInfoCardTitle}>More info</h2>
                        <div className={css.listWrapper}>
                            {moreInfoListMock.map((item, index) => (
                                <div key={index} className={css.listItem}>
                                    <div className={css.listItemTitle}>
                                        {item.title}
                                    </div>
                                    <div>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <TermsAndConditions />
                    <AppFooter>
                        <AppButton label={texts.button} to={'/swap'} />
                    </AppFooter>
                </div>
            )}
        />
    );
};

export default AssetsSinglePage;
