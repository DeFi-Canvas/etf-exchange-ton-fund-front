import * as E from 'fp-ts/Either';
import { Amount } from '../../components/amount/amount.component';
import css from './check.module.css';
import { injectable } from '@injectable-ts/core';
import { FooterContainer } from './footer/footer.container';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';

interface CheckProps {
    ammount: E.Either<string, number>;
    approximateCost: string;
    currency: string;
    address: E.Either<string, string>;
    memo: E.Either<string, string>;
    symbolLogo: string;
}

export const Check = injectable(
    FooterContainer,
    (FooterContainer) =>
        ({
            ammount,
            approximateCost,
            currency,
            address,
            memo,
            symbolLogo,
        }: CheckProps) => {
            return (
                <div className={css.main}>
                    <span>Check the data</span>
                    <div className={css.wrap}>
                        <Amount
                            symbolLogo={symbolLogo}
                            ammount={ammount}
                            approximateCost={approximateCost}
                            currency={currency}
                        />

                        <div className={css.column}>
                            <span className={css.title}>Withdraw address</span>
                            <RenderResult
                                data={address}
                                success={(address) => (
                                    <span className={css.row}>{address}</span>
                                )}
                            />
                        </div>
                        <div className={css.column}>
                            <span className={css.title}>
                                Tag/Memo (Comment/Note/Remark)
                            </span>
                            <RenderResult
                                data={memo}
                                success={(memo) => (
                                    <span className={css.row}>{memo}</span>
                                )}
                            />
                        </div>

                        <div className={css.column}>
                            <span className={css.title}>Commission</span>
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
