import { Assets } from '@/components/assets-card/assets-card.model.ts';

interface CardDefaultProps extends Assets {}

const CardDefault = (props: CardDefaultProps) => {
    return (
        <div>
            <img src={props.img} alt="" />
            <div>
                <span>{props.title}</span>
                <span>{props.subTitle}</span>
            </div>
            {props.price ? (
                <div>
                    <span dangerouslySetInnerHTML={{ __html: props.price }} />
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default CardDefault;
