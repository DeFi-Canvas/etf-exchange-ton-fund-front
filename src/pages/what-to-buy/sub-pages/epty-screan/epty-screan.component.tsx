import css from './epty-screan.module.css';

interface EmptyScreanProps {
    emptyGif: string;
    text: string;
}

export const EmptyScrean = ({ emptyGif, text }: EmptyScreanProps) => {
    return (
        <div className={css.wrapEmptyScrean}>
            <img src={emptyGif} alt="nothig found" />
            <p className={css.text}>{text}</p>
        </div>
    );
};
