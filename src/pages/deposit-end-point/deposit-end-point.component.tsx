import css from './deposit-end-point.module.css';
import cn from 'classnames';
import * as E from 'fp-ts/Either';
import { DepositDetails } from './deposit-end-point.view-model';
import { pipe } from 'fp-ts/lib/function';
import { useParams } from 'react-router-dom';
import { ErrorResult } from '@/components/error-result/error-result.component';
import InfoCard from './components/info-card/info-card.component';

interface DepositEndPointProps {
    readonly details: E.Either<string, DepositDetails>;
    readonly coinLogo: string;
}

export const DepositEndPoint = ({
    details,
    coinLogo,
}: DepositEndPointProps) => {
    const { ticker } = useParams();

    const renderDepositEndPoint = pipe(
        details,
        E.fold(
            (e) => <ErrorResult error={e} />,
            (details) => {
                return (
                    <>
                        <div className={cn('app-container', css.content)}>
                            <div className={css.titleWrap}>
                                Send only&nbsp;
                                <span className={css.bold}>{ticker}</span>
                                &nbsp;via&nbsp;
                                <span className={css.bold}>TON</span>&nbsp;to
                                this address. Other coins, jettons and NFTs will
                                be permanently lost.
                            </div>
                            <img src={details.qrCode} className={css.qrCode} />
                            <div className={css.infoWrapper}>
                                <InfoCard
                                    title={'Deposit address'}
                                    node={details.address}
                                />
                                <InfoCard
                                    title={'Tag/Memo (Comment/Note)'}
                                    node={details.memo}
                                />
                            </div>
                        </div>
                        <div className={css.overlayWrapper}>
                            <img
                                src={coinLogo}
                                className={css.coinLogoImage1}
                            />
                            <img
                                src={coinLogo}
                                className={css.coinLogoImage2}
                            />
                        </div>
                    </>
                );
            }
        )
    );

    return <div>{renderDepositEndPoint}</div>;
};
