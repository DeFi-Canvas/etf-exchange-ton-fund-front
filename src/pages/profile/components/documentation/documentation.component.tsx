import css from './documentation.module.css';
import { Link } from 'react-router-dom';

export const Documentation = () => {
    const documentationLink = 'https://holstby.github.io/etf-exchange-ton-fund-gitbook/docs/introduction.html';
    
    return (
        <div className={ css.cardWrapper }>
            <div className="app-container">
                <Link
                    to={ documentationLink }
                    target="_blank"
                    rel="noreferrer"
                >
                    Documentation
                </Link>
            </div>
        </div>
    );
};
