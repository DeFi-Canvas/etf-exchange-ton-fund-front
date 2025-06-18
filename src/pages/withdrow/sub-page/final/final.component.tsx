import { useNavigate } from 'react-router-dom';
import css from './final.module.css';
import * as E from 'fp-ts/Either';
import img from '../../../../assets/images/joyful_duck.gif';
import cn from 'classnames';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { Error } from '@/store/errors/error-system';

interface FinalProps {
    amount: E.Either<Error, number>;
    currency: string;
    address: E.Either<Error, string>;
    onClick: () => void;
    texts: {
        title: string;
        description: string;
        ammount: (amount: number, currency: string) => string;
        view: string;
        finish: string;
    };
}

export const Final = ({
    amount,
    currency,
    address,
    onClick,
    texts,
}: FinalProps) => {
    const navigate = useNavigate();
    const eventBuilder = useTWAEvent();

    return (
        <div className={css.wrap}>
            <span className={css.currency}>
                {currency} {texts.title}
            </span>
            <span className={css.normal}>{texts.description}</span>
            <img src={img} alt="" />
            <RenderResult
                data={amount}
                success={(amount) => (
                    <span className={css.amount}>
                        {texts.ammount(amount, currency)}
                    </span>
                )}
            />
            <RenderResult
                data={address}
                success={(address) => (
                    <span className={cn(css.normal, css.address)}>
                        {address}
                    </span>
                )}
            />
            <div className={css.footer}>
                <button
                    className={css.transactions}
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'WITHDRAW_PAGE_FINISH: view transactions click'
                        );
                        navigate('/#transactions');
                        onClick();
                    }}
                >
                    {texts.view}
                </button>
                <button
                    className={css.finish}
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'WITHDRAW_PAGE_FINISH: finish click'
                        );
                        navigate('/');
                        onClick();
                    }}
                >
                    {texts.finish}
                </button>
            </div>
        </div>
    );
};
