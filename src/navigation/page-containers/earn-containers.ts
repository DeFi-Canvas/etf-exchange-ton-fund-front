import { getContainersArgs, Component } from '../containers';
import { StormContainer } from '@/pages/earn/deposit-protocol/storm/storm.container';

export interface EarnContainers {
    Storm: Component;
}

export const getEarnContainers = (
    services: getContainersArgs
): EarnContainers => ({
    Storm: StormContainer({
        assetService: services.assetService,
        scheduler: services.scheduler,
        waletRestService: services.waletRestService,
    }),
});
