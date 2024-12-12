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

export const TabSlider = ({
    totalTabsCount,
    lastTabIndex,
    activeTab,
}: TabSliderProps) => {
    const firstTabIndex = 0;

    const styleSlider: CustomCSSProperties = {
        '--left': '2px',
        '--width': `${100 / totalTabsCount}%`,
    };

    useMemo(() => {
        let positionLeft = '0px';
        const sliderByCountTab = (activeTab * 100) / totalTabsCount;

        if (firstTabIndex === activeTab) {
            // Позиция для первого таба
            positionLeft = '2px';
        } else if (lastTabIndex === activeTab) {
            // Позиция для последнего таба
            positionLeft = `calc(${sliderByCountTab}% - 2px)`;
        } else {
            // Позиция для остальных табов
            positionLeft = `${sliderByCountTab}%`;
        }

        styleSlider['--left'] = positionLeft;
    }, [activeTab, totalTabsCount]);

    return <span className={css.slider} style={styleSlider} />;
};
