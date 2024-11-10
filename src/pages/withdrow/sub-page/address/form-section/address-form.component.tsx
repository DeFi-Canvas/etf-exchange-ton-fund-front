import css from './address-form.module.css';

interface AddressFormProps {}

export const AddressForm = () => {
    return (
        <div className={css.wrap}>
            <div className={css.amount}>
                <span className={css.title}>Withdraw amount</span>
                <div className={css.coinInfo}>
                    <img src="" alt="" />
                    <div className={css.column}>
                        <span className={css.title}>1 253,03 TON</span>
                        <span className={css.sub}>≈5 584,96 USD</span>
                    </div>
                    <div className={css.column}>
                        <span className={css.title}>TRC 20</span>
                        <span className={css.sub}>Tron Network</span>
                    </div>
                </div>
            </div>
            <div className={css.column}>
                <span className={css.title}>Withdraw address</span>
                <textarea
                    name=""
                    className={css.input}
                    placeholder="Input or press and hold to paste the withdrawal address"
                />
            </div>

            <div className={css.column}>
                <span className={css.title}>
                    Tag/Memo (Comment/Note/Remark)
                </span>
                <input
                    name=""
                    className={css.input}
                    placeholder="Enter your tag"
                />
            </div>

            <div className={css.column}>
                <span className={css.title}>Commission</span>
                <span className={css.commission}>0,5 TON ≈ 2,06 USD </span>
            </div>
        </div>
    );
};
