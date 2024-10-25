import { DownIcon, UpIcon } from '@/components/Icons/Icons.tsx';
import './BadgeSmall.scss';

type PropsType = {
    value: number;
};

const BadgeSmall = ({ value }: PropsType) => {
    return (
        <div
            className={`badge--small ${value >= 0 ? 'badge--small-green' : 'badge--small-red'}`}
        >
            {value >= 0 ? <UpIcon /> : <DownIcon />}
            <span>{value.toFixed(2)}%</span>
        </div>
    );
};

export default BadgeSmall;
