import css from './title.module.css';

interface TitleProps {
    title: string;
}

const Title = (props: TitleProps) => {
    return <h1 className={css.title}>{props.title}</h1>
}

export default Title;
