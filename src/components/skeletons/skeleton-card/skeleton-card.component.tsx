import SkeletonMediumCard from '../components/skeleton-medium-card/skeleton-medium-card.component';
import SkeletonSmallCard from '../components/skeleton-small-card/skeleton-smal-card.component';

interface SkeletonCardProps {
    type: 'small' | 'medium';
}

const SkeletonCard = (props: SkeletonCardProps) => {
    return (
        <>
            {props.type === 'small' && <SkeletonSmallCard />}
            {props.type === 'medium' && <SkeletonMediumCard />}
        </>
    );
};

export default SkeletonCard;
