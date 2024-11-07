import { CopyIcon } from '@/components/Icons/Icons';
import css from './deposit-end-point.module.css';
import cn from 'classnames';
import { useState } from 'react';
import * as E from 'fp-ts/Either';
import { DepositDetails } from './deposit-end-point.view-model';
import { pipe } from 'fp-ts/lib/function';
import { useParams } from 'react-router-dom';

interface DepositEndPointProps {
    readonly details: E.Either<string, DepositDetails>;
}

export const DepositEndPoint = ({ details }: DepositEndPointProps) => {
    const { ticker } = useParams();

    const renderDepositEndPoint = pipe(
        details,
        E.fold(
            (e) => <span className={css.err}>{e}</span>,
            (details) => {
                return (
                    <>
                        <div className={css.titleWrap}>
                            <p>
                                Send only {ticker} via TON to this address.
                                Other coins, jettons and NFTs will be
                                permanently lost.
                            </p>
                        </div>
                        <div className={css.imgWrap}>
                            <img
                                src={details.qrCode}
                                alt=""
                                className={css.img}
                            />
                        </div>
                        <div className={css.infoWrap}>
                            <InfoSection
                                title={'Deposit address'}
                                node={details.address}
                            />
                            <InfoSection
                                title={'Tag/Memo (Comment/Note)'}
                                node={details.memo}
                            />
                        </div>
                    </>
                );
            }
        )
    );
    return <div>{renderDepositEndPoint}</div>;
};

interface InfoSectionProps {
    title: string;
    node: string;
}
const InfoSection = ({ title, node }: InfoSectionProps) => {
    const [isActive, setIsActive] = useState(false);
    const onClick = () => {
        navigator.clipboard.writeText(node);
        setIsActive(true);
    };

    return (
        <div className={css.infoSection}>
            <div className={css.wrap}>
                <span className={css.title}>{title}</span>
                <button
                    className={cn(css.btn, { [css.btnActive]: isActive })}
                    onClick={onClick}
                >
                    Copy
                    <CopyIcon className={cn(css.svg)} />
                </button>
            </div>
            <span className={css.node}>{node}</span>
        </div>
    );
};
