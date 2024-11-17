import { Assets } from '@/components/assets-card/assets-card.model.ts';

interface AssetsCardDefaultProps extends Assets {}

const AssetsCardDefault = (props: AssetsCardDefaultProps) => {
    return (
        <div>
            <img src={props.img} alt='' />
            <div>
                <span>{props.title}</span>
                <span>{props.subTitle}</span>
            </div>
            {/* TODO: render if no empty price */}
            {
                props.price
                    ?
                        <div>
                            <span dangerouslySetInnerHTML={{ __html: props.price }} />
                        </div>
                    :
                        <div></div>
            }
        </div>
    )
}

export default AssetsCardDefault;
