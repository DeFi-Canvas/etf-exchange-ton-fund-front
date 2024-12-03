import { Chart } from '@/components/chart/chart.component.tsx';
import { constVoid } from 'fp-ts/function';
import CardPrice from '@/pages/what-to-buy/sub-page/funds/components/price/price.components.tsx';
import css from './assets-single.module.css';
import cn from 'classnames';

interface MoreInfoItem {
    title: string;
    value: string;
}

const AssetsSinglePage = () => {
    const moreInfoListMock: MoreInfoItem[] = [
        { title: 'Market cap', value: '$13.8B' },
        { title: 'Volume (24h)', value: '$563.7M' },
        { title: 'Circulating supply', value: '2.5B TON' },
        { title: 'All time high', value: '$8.23' },
    ];

    return (
        <div className={cn('app-container', css.page)}>
            <div className={cn(css.card, css.assetCard)}>
                <img src="temp-ton.png" />
                <div className={css.assetCardText}>Toncoin</div>
            </div>
            <div className={cn(css.card, css.assetSingleChartWrapper, css.chartWrapper)}>
                <CardPrice />
                <Chart
                    data={[1, 3, 2, 6, 5, 8]}
                    dateRange={{ from: '4 AUG', to: '4 OCT' }}
                    controlOnClick={constVoid}
                />
            </div>
            <div className={cn(css.card, css.aboutCard)}>
                <h2 className={css.aboutCardTitle}>About</h2>
                <p className={css.aboutCardText}>
                    Toncoin (TON) is a decentralized layer-1 blockchain that was initially developed in 2018 by an encrypted messaging platform. However, the project was later taken over by the TON Foundation and renamed from "Telegram Open Network" to "The Open Network". Toncoin, previously known as Gram, is the native cryptocurrency of the TON network. The network seeks to provide an ecosystem with decentralized storage, services, a domain name system, an anonymous network, an instant payment platform, and efficient transaction processing. The TON network is community-driven and focuses on serving a typical consumer with its flexible architecture.
                </p>
            </div>
            <div className={cn(css.card, css.moreInfoCard)}>
                <h2 className={css.moreInfoCardTitle}>More info</h2>
                <div className={css.listWrapper}>
                    {moreInfoListMock.map((item, index) => (
                        <div key={index} className={css.listItem}>
                            <div className={css.listItemTitle}>{item.title}</div>
                            <div>{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AssetsSinglePage;
