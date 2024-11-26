import SkeletonCard, { SkeletonCardProps } from './skeleton-card.component';

interface SkeletonCardSection extends SkeletonCardProps {
    count: number;
}

export const SkeletonCardSection = ({ type, count }: SkeletonCardSection) => {
    return (
        <>
            {Array(count)
                .fill(null)
                .map((_, id) => (
                    <SkeletonCard type={type} key={id} />
                ))}
        </>
    );
};
