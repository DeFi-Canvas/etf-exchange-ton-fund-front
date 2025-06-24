import { WalletIcon } from '@/components/Icons/Icons';
import PurchaseSellAttention from '@/pages/what-to-buy/sub-page/components/purchase-sell-attention/purchase-sell-attention.component';
import PurchaseSellTitle from '@/pages/what-to-buy/sub-page/components/purchase-sell-title/purchase-sell-title.component';

export const Storm = () => {
    const attentionText = {
        title: 'Attention',
        text: 'Investments in the funds are in the beta testing phase. Please consider the risks.',
    };

    return (
        <div>
            <PurchaseSellTitle title={'Storm'} />
            <PurchaseSellAttention {...attentionText} />
            <div>
                <h3>description</h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,
                qui expedita esse nulla fugit voluptatibus ea cupiditate.
                Laborum illum consectetur eius optio, ab et nemo necessitatibus
                eaque quidem, quibusdam asperiores.
            </div>
            <AssetCard imageUrl={''} balance={0} />
            <AmountField maxAvailable={0} />
        </div>
    );
};

interface AssetCardProps {
    imageUrl: string;
    balance: number;
}

const AssetCard = ({ imageUrl, balance }: AssetCardProps) => {
    return (
        <div>
            <img src={imageUrl} />
            <span>{balance}</span>
        </div>
    );
};

interface AmountFieldProps {
    maxAvailable: number;
}

const AmountField = ({ maxAvailable }: AmountFieldProps) => {
    return (
        <div>
            <div>
                <span>Amount ($)</span>
                <div>
                    <WalletIcon />
                    {`$ ${maxAvailable.toFixed(2)}`}
                    <span>MAX</span>
                </div>
            </div>
            <input type="number" />
        </div>
    );
};
