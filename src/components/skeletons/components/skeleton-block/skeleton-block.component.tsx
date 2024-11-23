import cn from 'classnames';
import css from './skeleton-block.module.css';
import { CSSProperties } from 'react';

type CustomCSSProperties = CSSProperties & {
    '--size'?: string;
};

interface SkeletonBlockProps {
    size?: number;
    className?: string;
}

const SkeletonBlock = (props: SkeletonBlockProps) => {
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

export default SkeletonBlock;
