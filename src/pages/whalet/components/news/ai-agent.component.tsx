import css from './ai-agent.module.css';
import aiImage from './assets/ai.png';
import { ChevronRightIcon } from '@/components/Icons/Icons';
import { Link } from 'react-router-dom';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

interface LernMore {
    title: string;
    subTitle: string;
}

export const AiAgent = ({ subTitle }: LernMore) => {
    const eventBuilder = useTWAEvent();

    return (
        <div
            className={css.card}
            onClick={() => {
                trackTelemetree(eventBuilder, 'WALLET_PAGE: "AI" slide click');
            }}
        >
            <div className={css.content}>
                <span className={css.contentTitle}>
                    Try our AI assistant & turn your time into money! {}
                </span>
                <Link
                    to={'https://t.me/deficanvastest_bot'}
                    target="_blank"
                    rel="noreferrer"
                    className={css.contentLink}
                >
                    {subTitle} <ChevronRightIcon size={16} />
                </Link>
            </div>
            <div className={css.imageWrapper}>
                <img src={aiImage} className={css.image} />
            </div>
        </div>
    );
};
