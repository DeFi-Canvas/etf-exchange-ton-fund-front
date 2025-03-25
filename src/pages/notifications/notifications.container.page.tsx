import { Notifications } from './notifications.page';

const NOTIFICATIONS_MOCK = [
    {
        date: 'Today',
        body: [
            {
                status: 'DEPOSIT',
                title: 'Deposit',
                subTitle: 'Amount: 1100 USD₮',
            },
            {
                status: 'WITHDRAW',
                title: 'WITHDRAW',
                subTitle: 'Try again later',
            },
        ],
    },
    {
        date: '10 Oct, 2024',
        body: [
            {
                status: 'DEPOSIT',
                title: 'Deposit',
                subTitle: 'Amount: 1100 USD₮',
            },
            {
                status: 'WITHDRAW',
                title: 'WITHDRAW',
                subTitle: 'Try again later',
            },
        ],
    },
];

export const NotificationsPageContainer = () => {
    // @ts-ignore
    return <Notifications notifications={NOTIFICATIONS_MOCK} />;
};
