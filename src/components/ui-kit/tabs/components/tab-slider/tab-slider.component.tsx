import css from './tab-slider.module.css';
import { CSSProperties, useMemo } from 'react';

type CustomCSSProperties = CSSProperties & {
    '--left': string;
    '--width': string;
};

interface TabSliderProps {
    totalTabsCount: number;
    lastTabIndex: number;
    activeTab: number;
}

const TabSlider = (props: TabSliderProps) => {
    const firstTabIndex = 0;

    const styleSlider: CustomCSSProperties = {
        '--left': '2px',
        '--width': `${100 / props.totalTabsCount}%`,
    };

    useMemo(() => {
        let positionLeft = '0px';
        const sliderByCountTab = (props.activeTab * 100) / props.totalTabsCount;

        if (firstTabIndex === props.activeTab) {
            // Позиция для первого таба
            positionLeft = '2px';
        } else if (props.lastTabIndex === props.activeTab) {
            // Позиция для последнего таба
            positionLeft = `calc(${sliderByCountTab}% - 2px)`;
        } else {
            // Позиция для остальных табов
            positionLeft = `${sliderByCountTab}%`;
        }

        styleSlider['--left'] = positionLeft;
    }, [props.activeTab, props.totalTabsCount]);

    return <span className={css.slider} style={styleSlider} />;
};

export default TabSlider;
