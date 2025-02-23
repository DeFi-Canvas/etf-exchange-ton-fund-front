import { SpinIcon } from '../Icons/Icons';
import css from './loader.module.css';
import cn from 'classnames';

interface LoaderProps {
    size?: 'small' | 'medium';
}
export const Loader = ({ size = 'medium' }: LoaderProps) => {
    return (
        <>
            <div className={cn(css.loading, css[size])}>
                <SpinIcon />
            </div>
        </>
    );
};
