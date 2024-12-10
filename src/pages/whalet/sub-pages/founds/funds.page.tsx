import css from './funds.module.css';
import { EmptyScrean } from '../epty-screan/epty-screan.component';
import emptyGif from '../../../../assets/images/money_duck.gif';
import AppButton from '@/components/app-button/app-button.component.tsx';
import * as E from 'fp-ts/Either';
import { AssetsCard } from '@/components/assets-card/assets-card.component';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { FundsData } from '../../whalet.model';
import { SkeletonCardSection } from '@/components/skeletons/skeleton-card/skeleton-card-section.component';
import { formatNumberToUI } from '@/utils/number';
import { Link } from 'react-router-dom';

const emptyText = `You don't have any investments in funds right now. Get started by browsing through funds to discover opportunities.`;

interface FundsProps {
    funds: E.Either<string, Array<FundsData>>;
}

//TODO: вынести в модель
const formattedData = (assets: FundsData) => {
    // TODO:V Вынести глобально в стор или какое-то местное реакт хранилище - значок доллора перед переменной говорит о том, что переменная глобальная
    const $currency = '&dollar;';

    return {
        id: assets.id,
        img: assets.logo,
        title: `${assets.name}`,
        subTitle: '',
        price: `${$currency} ${formatNumberToUI(assets.cost)}`,
        priceText: '',
    };
};

export const Funds = ({ funds }: FundsProps) => {
    const footerSlot = () => (
        <div className={css.footerButtons}>
            <AppButton to={'/deposit'} label="Deposit" type="secondary" />
            <AppButton label="Choose a fund" to="/what-to-buy/funds" />
        </div>
    );

    return (
        <div className={css.wrap}>
            <RenderResult
                data={funds}
                success={(funds) => (
                    <>
                        {funds.map((fund) => (
                            <Link
                                to={`/what-to-buy/fund/${fund.id}`}
                                key={fund.id}
                            >
                                <AssetsCard {...formattedData(fund)} />
                            </Link>
                        ))}
                    </>
                )}
                loading={() => <SkeletonCardSection count={4} type={'small'} />}
                failure={() => (
                    <EmptyScrean
                        footerSlot={footerSlot}
                        emptyGif={emptyGif}
                        text={emptyText}
                    />
                )}
            />
        </div>
    );
};
