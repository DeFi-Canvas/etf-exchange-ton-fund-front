import css from './strategy-basics.module.css';
import cn from 'classnames';
import { FileField } from '@/components/ui-kit/file-field/file-field.component.tsx';
import { InputField } from '@/components/ui-kit/input-field/input-field.component.tsx';
import { TextareaField } from '@/components/ui-kit/textarea-field/textarea-field.component.tsx';

export const StrategyBasics = () => {
    return (
        <div className={css.page}>
            <header className={'app-container'}>
                <h2 className="h2">Strategy basics</h2>
                <p className={cn('body-m-regular', 'mt-1')}>
                    Add a thumbnail, name, description, and unique ticker for
                    the new strategy.
                </p>
            </header>
            <div className={css.body}>
                <FileField label="Strategy thumbnail *" />
                <InputField
                    className="mt-5"
                    label="Strategy name *"
                    placeholder="Best of the best"
                    limitWord={40}
                />
                <TextareaField
                    className="mt-5"
                    label="Strategy description *"
                    placeholder="Best of the best"
                    limitWordMin={180}
                    limitWordMax={400}
                />
            </div>
        </div>
    );
};
