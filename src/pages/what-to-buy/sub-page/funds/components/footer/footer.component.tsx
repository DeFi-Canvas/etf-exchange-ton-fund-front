import AppButton from '@/components/AppButton/AppButton';
import css from './footer.module.css';
import * as E from 'fp-ts/Either';
import { useNavigate, useParams } from 'react-router-dom';
import { FundsData } from '@/pages/whalet/whalet.model';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';

interface FooterProps {
    fundsAvailableSale: E.Either<string, Array<FundsData>>;
}

const Footer = ({ fundsAvailableSale }: FooterProps) => {
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

export default Footer;
