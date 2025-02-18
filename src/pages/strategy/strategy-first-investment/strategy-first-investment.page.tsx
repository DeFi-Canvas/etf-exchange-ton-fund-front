import css from './strategy-first-investment.module.css';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { Dropdown } from '@/components/dropdown/dropdown.component.tsx';
import { useState } from 'react';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component.tsx';
import { WalletIcon } from '@/components/Icons/Icons.tsx';
import cn from 'classnames';
import { InputField } from '@/components/ui-kit/input-field/input-field.component.tsx';
import { AssetsCard } from '@/components/assets-card/assets-card.component.tsx';
import { SuccessContentBottomSheet } from '@pages/strategy/strategy-first-investment/components/success-content-bottom-sheet/success-content-bottom-sheet.component.tsx';
import { SaveDraftContentBottomSheet } from '@pages/strategy/strategy-first-investment/components/save-draft-content-bottom-sheet/save-draft-content-bottom-sheet.component.tsx';

// MOCK
const detailsOptions = [
    { name: 'Commission', value: ['$ 0'] },
    { name: 'Total in USD', value: ['$ 25,39'] },
    { name: 'Total in TON', value: ['5,46'] },
];
const assetItem = {
    id: '1',
    img: 'temp-usdt-coin.png',
    title: '$ 1 277,54',
    subTitle: '649,92 TON',
    price: '',
    priceText: '',
};

export const StrategyFirstInvestment = () => {
    const [successBottomSheet, setSuccessBottomSheet] = useState(false);
    const [draftSaveBottomSheet, setDraftSaveBottomSheet] = useState(false);

    const userHasMoney = true;
    const maxAvailable = 1277.54;

    const openSuccess = () => setSuccessBottomSheet(true);
    const closeSuccess = () => setSuccessBottomSheet(false);
    const openDraftSave = () => setDraftSaveBottomSheet(true);
    const closeDraftSave = () => setDraftSaveBottomSheet(false);

    return (
        <div className={css.page}>
            <header className={'app-container'}>
                <h2 className="h2">Strategy preview</h2>
                <p className="body-m-regular color-text-dark-70 mt-1">
                    Look at the strategy preview, check all items and edit them
                    if necessary.
                </p>
            </header>
            <div className="app-container">
                <div className={css.cardInfo}>
                    <img
                        src="temp-strategy-cover.png"
                        className={css.cardInfoImage}
                    />
                    <div className={css.cardInfoText}>
                        <h3 className="body-l-medium trim-lines-1">
                            Alpha Capital: Long-Term Investments
                        </h3>
                        <p className="body-s-regular color-text-dark-50">
                            TONSTRATEGY
                        </p>
                    </div>
                </div>
            </div>
            <div className={css.body}>
                <h3 className="body-m-medium">Asset</h3>
                <div className="mt-2">
                    <AssetsCard
                        key={assetItem.id}
                        id={assetItem.id}
                        img={assetItem.img}
                        title={assetItem.title}
                        subTitle={assetItem.subTitle}
                        price={assetItem.price}
                        priceText={assetItem.priceText}
                    />
                </div>
                <div>
                    <header className={cn(css.cardTitle, 'mt-5')}>
                        <span>Amount ($)</span>
                        <div className={css.availablePrice}>
                            <div className={css.maxAvailable}>
                                <WalletIcon />
                                {`$ ${maxAvailable?.toFixed(2)}`}
                            </div>
                            <div className={css.cardTitleMaxValue}>MAX</div>
                        </div>
                    </header>
                    <InputField
                        className="mt-2"
                        placeholder="Enter amount (min. 50$)"
                    />
                    <div className="body-s-regular mt-2">≈ 0,00 TON</div>
                </div>
            </div>
            <div className="app-container mt-6">
                <Dropdown title="Purchase Details" options={detailsOptions} />
            </div>
            <AppFooter className={css.footer}>
                <AppButton
                    label="Save as draft"
                    type="secondary"
                    onClick={openDraftSave}
                />
                {userHasMoney ? (
                    <AppButton label="Invest & Publish" onClick={openSuccess} />
                ) : (
                    <AppButton label="+ Deposit" />
                )}
            </AppFooter>

            <BottomSheet open={successBottomSheet} onClose={closeSuccess}>
                <SuccessContentBottomSheet
                    title="Alpha Capital: Long-Term Investments"
                    onClose={closeSuccess}
                />
            </BottomSheet>
            <BottomSheet open={draftSaveBottomSheet} onClose={closeDraftSave}>
                <SaveDraftContentBottomSheet
                    title="Alpha Capital: Long-Term Investments"
                    onClose={closeDraftSave}
                />
            </BottomSheet>
        </div>
    );
};
