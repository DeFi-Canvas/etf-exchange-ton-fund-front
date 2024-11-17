import css from './error-result.module.css';

interface ErrorResult {
    error: string;
}
// TODO: сделать глобальным компонентом
// сузить тип до 'penfing' | 'loading err' | string
// стоит подумать над RenderResult
export const ErrorResult = ({ error }: ErrorResult) => {
    return (
        <div className={css.wrap}>
            <img
                src="https://s3-alpha-sig.figma.com/img/71ce/d796/17f442a8e8c5be237ff40335c0fe980d?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KHZAEkxdKldbFP1MVnD8e-pXFgWlTVkwd~s1fHsKtczYrc~wWT5XPopxCfcP8oyduen6K2FXVeKbhXrJqTvZ8DVMRO1E1N~chqxOBxN0f59kB4tQm2aFDKYA93MNKYSp3bVRNDPzrUIJbVMlfXLWOuQ5CJKVY7Rg2DESjys0WM~LsPwyLPpurOoNM44Ob0UPgm9WwnoU5UtD5SS9elhJXGAjBsHfWWAeGtG6d1SoK79LyLFOHYtsMsYzFQnQcD47wgaGoiS2jQ-AAWrCIS9TLvnEnCIhK0K424PVsSW8yqZ9JKoCfV1xp3gtzhZZrvIRQf52H3IOzEaTlINZXViiWQ__"
                alt=""
            />
            <span>{error}</span>
        </div>
    );
};
