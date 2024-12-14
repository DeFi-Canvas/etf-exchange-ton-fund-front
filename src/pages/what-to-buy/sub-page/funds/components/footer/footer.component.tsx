import * as E from 'fp-ts/Either';
import { useNavigate, useParams } from 'react-router-dom';
import { FundsData } from '@/pages/whalet/whalet.model';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import AppButton from '@/components/app-button/app-button.component';
import css from './footer.module.css';

interface FooterProps {
    fundsAvailableSale: E.Either<string, Array<FundsData>>;
}

export const Footer = ({ fundsAvailableSale }: FooterProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <footer className={css.footer}>
            <RenderResult
                data={fundsAvailableSale}
                failure={() => null}
                success={() => (
                    <AppButton
                        label="Sell"
                        type="secondary"
                        onClick={() => navigate(`/what-to-buy/sell/${id}`)}
                    />
                )}
            />
            <AppButton
                label="Buy"
                onClick={() => navigate(`/what-to-buy/purchase/${id}`)}
            />
        </footer>
    );
};
