import { ToasterCloseIcon } from '@/components/Icons/Icons';
import { CloseButtonProps } from 'react-toastify';
import css from './close-button.module.css';

export const CloseReactToastify = ({ closeToast }: CloseButtonProps) => (
    <button onClick={closeToast} className={css.button}>
        <ToasterCloseIcon />
    </button>
);
