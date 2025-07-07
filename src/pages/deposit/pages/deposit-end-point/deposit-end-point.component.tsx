import css from './deposit-end-point.module.css';
import cn from 'classnames';
import * as E from 'fp-ts/Either';
import { DepositDetails } from './deposit-end-point.view-model';
import { useParams } from 'react-router-dom';
import { ErrorResult } from '@/components/error-result/error-result.component';
import InfoCard from './components/info-card/info-card.component';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { Error } from '@/store/errors/error-system';

interface DepositEndPointProps {
    readonly details: E.Either<Error, DepositDetails>;
    readonly coinLogo: E.Either<Error, string>;
    readonly texts: {
        title: (
            ticker: string | undefined,
            css: CSSModuleClasses
        ) => JSX.Element;
        address: string;
        tag: string;
        button: string;
    };
}

export const DepositEndPoint = ({
    details,
    coinLogo,
    texts,
}: DepositEndPointProps) => {
    const { ticker } = useParams();
    const eventBuilder = useTWAEvent();

    return (
        <RenderResult
            data={details}
            failure={(e) => <ErrorResult error={e} />}
            success={(details) => {
                return (
                    <>
                        <div className={cn('app-container', css.content)}>
                            <div className={css.titleWrap}>
                                {texts.title(ticker, css)}
                            </div>
                            <img src={details.qrCode} className={css.qrCode} />
                            <div className={css.infoWrapper}>
                                <InfoCard
                                    title={texts.address}
                                    node={details.address}
                                    onClcik={() => {
                                        trackTelemetree(
                                            eventBuilder,
                                            'DEPOSIT_PAGE: deposit address copy click'
                                        );
                                    }}
                                />
                                <InfoCard
                                    title={texts.tag}
                                    node={details.memo}
                                    onClcik={() => {
                                        trackTelemetree(
                                            eventBuilder,
                                            'DEPOSIT_PAGE: Tag/Memo (Comment/Note) copy click'
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <RenderResult
                            data={coinLogo}
                            success={(coinLogo) => (
                                <div className={css.overlayWrapper}>
                                    <img
                                        src={coinLogo}
                                        className={css.coinLogoImage1}
                                    />
                                    <img
                                        src={coinLogo}
                                        className={css.coinLogoImage2}
                                    />
                                </div>
                            )}
                        />

                        <AppFooter>
                            <AppButton
                                label={texts.button}
                                to={'/'}
                                onClick={() => {
                                    trackTelemetree(
                                        eventBuilder,
                                        'DEPOSIT_PAGE: finish click'
                                    );
                                }}
                            />
                        </AppFooter>
                    </>
                );
            }}
        />
    );
};
