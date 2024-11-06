import { useParams } from 'react-router-dom';

export const DepositEndPoint = () => {
    const { ticker } = useParams();
    return (
        <div>
            <span>{ticker}</span>
        </div>
    );
};
