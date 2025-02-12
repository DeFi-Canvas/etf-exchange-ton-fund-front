import * as E from 'fp-ts/Either';
import { useNavigate, useParams } from 'react-router-dom';
import { FundsData } from '@/pages/whalet/whalet.model';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import AppButton from '@/components/app-button/app-button.component';
import css from './footer.module.css';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

interface FooterProps {
    fundsAvailableSale: E.Either<string, Array<FundsData>>;
    fundAvailablebuy: E.Either<string, boolean>;
}

export const Footer = ({
    fundsAvailableSale,
    fundAvailablebuy,
}: FooterProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const eventBuilder = useTWAEvent();

    return (
        <footer className={css.footer}>
            <RenderResult
                data={fundsAvailableSale}
                failure={() => null}
                success={() => (
                    <AppButton
                        label="Sell"
                        type="secondary"
                        onClick={() => {
                            trackTelemetree(
                                eventBuilder,
                                'WHAT_TO_BUY_PAGE: sell click'
                            );
                            navigate(`/what-to-buy/sell/${id}`);
                        }}
                    />
                )}
            />

            <RenderResult
                data={fundAvailablebuy}
                failure={() => null}
                success={(isDisabled) => (
                    <AppButton
                        label="Buy"
                        onClick={() => {
                            trackTelemetree(
                                eventBuilder,
                                'WHAT_TO_BUY_PAGE: buy click'
                            );
                            navigate(`/what-to-buy/purchase/${id}`);
                        }}
                        isDisabled={isDisabled}
                    />
                )}
            />
        </footer>
    );
};
