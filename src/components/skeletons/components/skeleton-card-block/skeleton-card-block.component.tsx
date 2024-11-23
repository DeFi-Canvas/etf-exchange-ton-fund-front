import cn from 'classnames';
import css from './skeleton-block-card.module.css';
import { CSSProperties } from 'react';

type CustomCSSProperties = CSSProperties & {
    '--size'?: string;
};

interface SkeletonCardBlockProps {
    size?: number;
    className?: string;
}

const SkeletonCardBlock = (props: SkeletonCardBlockProps) => {
    const styleList: CustomCSSProperties = {
        '--size': `${props.size ?? 40}px`,
    };

    return (
        <div
            className={cn('skeleton', css.block, props.className)}
            style={styleList}
        ></div>
    );
};

export default SkeletonCardBlock;
