import cn from 'classnames';
import css from './skeleton-line.module.css';
import { CSSProperties } from 'react';

type CustomCSSProperties = CSSProperties & {
    '--height'?: string;
};

interface SkeletonLineProps {
    height?: number;
    className?: string;
}

const SkeletonLine = (props: SkeletonLineProps) => {
    const styleList: CustomCSSProperties = {
        '--height': `${props.height ?? 16}px`,
    };

    return (
        <div
            className={cn('skeleton', css.line, props.className)}
            style={styleList}
        ></div>
    );
};

export default SkeletonLine;
