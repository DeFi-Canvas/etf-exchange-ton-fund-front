import { StrategyStepsPage } from '@pages/strategy/steps/steps.page.tsx';
import { StrategyBasics } from '@pages/strategy/strategy-basics/strategy-basics.page.tsx';
import { StrategyAssetsInside } from '@pages/strategy/strategy-assets-inside/strategy-assets-inside.page.tsx';
import { StrategyFees } from '@pages/strategy/strategy-fees/strategy-fees.page.tsx';
import { StrategyPreview } from '@pages/strategy/strategy-preview/strategy-preview.page.tsx';
import { StrategyFirstInvestment } from '@pages/strategy/strategy-first-investment/strategy-first-investment.page.tsx';

export const strategyRouter = () => [
    {
        path: '/strategy',
        page: StrategyStepsPage,
    },
    {
        path: '/strategy/basics',
        page: StrategyBasics,
    },
    {
        path: '/strategy/assets-inside',
        page: StrategyAssetsInside,
    },
    {
        path: '/strategy/fees',
        page: StrategyFees,
    },
    {
        path: '/strategy/preview',
        page: StrategyPreview,
    },
    {
        path: '/strategy/investment',
        page: StrategyFirstInvestment,
    },
];
