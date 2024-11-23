import AppButton from '@/components/AppButton/AppButton';
import css from './footer.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const ChartFooter = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return (
        <footer className={css.footer}>
            {/* <AppButton label="Sell" type="secondary" /> */}
            <AppButton
                label="Buy"
                onClick={() => navigate(`/what-to-buy/purchase/${id}`)}
            />
        </footer>
    );
};

export default ChartFooter;
