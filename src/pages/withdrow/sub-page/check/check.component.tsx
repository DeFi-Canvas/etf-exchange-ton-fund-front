import * as E from 'fp-ts/Either';
import { Amount } from '../../components/amount/amount.component';
import css from './check.module.css';
import { injectable, token } from '@injectable-ts/core';
import { FooterContainer } from './footer/footer.container';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';
import { Error } from '@/store/errors/error-system';

interface CheckProps {
    ammount: E.Either<Error, number>;
    approximateCost: string;
    currency: string;
    address: E.Either<Error, string>;
    symbolLogo: string;
}

export const Check = injectable(
    FooterContainer,
    token('i18n')<I18NService>(),
    (FooterContainer, i18n) =>
        ({
            ammount,
            approximateCost,
            currency,
            address,
            symbolLogo,
        }: CheckProps) => {
            const { Check: checkI18nTexts } = useProperty(i18n.Withdraw);

            return (
                <div className={css.main}>
                    <span>{checkI18nTexts.title}</span>
                    <div className={css.wrap}>
                        <Amount
                            symbolLogo={symbolLogo}
                            ammount={ammount}
                            approximateCost={approximateCost}
                            currency={currency}
                        />

                        <div className={css.column}>
                            <span className={css.title}>
                                {checkI18nTexts.address}
                            </span>
                            <RenderResult
                                data={address}
                                success={(address) => (
                                    <span className={css.row}>{address}</span>
                                )}
                            />
                        </div>

                        <div className={css.column}>
                            <span className={css.title}>
                                {checkI18nTexts.commission}
                            </span>
                            <span className={css.commission}>
                                0,5 TON ≈ 2,06 USD{' '}
                            </span>
                        </div>
                    </div>
                    <FooterContainer />
                </div>
            );
        }
);
