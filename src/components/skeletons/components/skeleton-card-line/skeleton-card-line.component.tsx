import cn from 'classnames';
import css from './skeleton-card-line.module.css';
import { CSSProperties } from 'react';

type CustomCSSProperties = CSSProperties & {
    '--height'?: string;
};

interface SkeletonCardLineProps {
    height?: number;
    className?: string;
}

const SkeletonCardLine = (props: SkeletonCardLineProps) => {
    const styleList: CustomCSSProperties = {
        '--height': `${props.height ?? 16}px`,
    };

    return <div className={cn('skeleton', css.line, props.className)} style={styleList}></div>;
};

export default SkeletonCardLine;
