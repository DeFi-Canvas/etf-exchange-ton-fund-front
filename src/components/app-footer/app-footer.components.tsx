import cn from 'classnames';
import css from './app-footer.module.css';

interface AppFooterProps {
    className?: string;
    children: React.ReactNode;
}

const AppFooter = (props: AppFooterProps) => {
    return (
        <footer className={cn(css.footer, props.className)}>
            {props.children}
        </footer>
    );
};

export default AppFooter;
