import { format } from 'date-fns';
import React, { Fragment, useEffect, useState } from 'react';
import Icon from '../../../../../../assets/icon.png';
import { UserConfig } from '../../../../../../interfaces/user';
import { ViewState } from '../../../../../../interfaces/view';
import { getTranslate } from '../../../../../../languages/language';
import { Certificate, Extension, File, Search } from '../../../../../components/Icons';
import { Information, Lock, Warning } from '../../../../../components/Icons/state';
import {
    StyledPanel,
    StyledPanelContainer,
    StyledPanelHeader,
    StyledPanelTitle
} from '../../../../../components/Panel/styles';
import { useUserConfigContext } from '../../../../../contexts/config';
import { useViewManagerContext } from '../../../../../contexts/view';
import { useElectronAPI } from '../../../../../utils/electron';
import {
    StyledCertificateStatus,
    StyledItemButton,
    StyledItemDescription,
    StyledItemIcon,
    StyledItemLabel,
    StyledItemLabelContainer,
    StyledItemSubLabel
} from './styles';

type PanelType = 'main' | 'certificate';

export const Panel = () => {

    const { getCurrentView } = useElectronAPI();
    const { getCurrentViewState } = useViewManagerContext();
    const { config } = useUserConfigContext();

    const translate = getTranslate(config);

    const [type, setType] = useState<PanelType>('main');
    const [state, setState] = useState<ViewState>(getCurrentViewState());
    const [url, setUrl] = useState<string>('');

    const currentView = getCurrentView();
    useEffect(() => {
        (async () => {
            const viewState = await currentView;
            setState(viewState);
            setUrl(viewState.url);
        })();
    }, [currentView]);

    return (
        <StyledPanel className="panel" type="popup">
            <StyledPanelHeader className="panel-header" type="popup">
                <StyledPanelTitle className="panel-title">
                    {translate.windows.app.pageInformation.label}
                </StyledPanelTitle>
            </StyledPanelHeader>
            {type === 'main' && <MainPanel state={state} config={config} setType={setType} />}
            {type === 'certificate' && <CertificatePanel state={state} config={config} setType={setType} />}
        </StyledPanel>
    );
};


interface StatusIconProps {
    state: ViewState;
}

const StatusIcon = ({ state }: StatusIconProps): JSX.Element => {
    if (!state.requestState || !state.requestState.type)
        return (<Information />);

    switch (state.requestState.type) {
        case 'secure':
            return (<Lock />);
        case 'insecure':
            return (<Warning />);
        case 'search':
            return (<Search />);
        case 'source':
        case 'file':
            return (<File />);
        case 'internal':
            return (<img src={Icon} width={24} height={24} />);
        case 'extension':
            return (<Extension />);
    }
};

interface PanelProps {
    state: ViewState;
    config: UserConfig;
    setType: (type: PanelType) => void;
}

const MainPanel = ({ state, config, setType }: PanelProps) => {
    const { label } = getCertificateTranslate(state, config);

    return (
        <StyledPanelContainer className="panel-container" style={{ padding: '8px 0' }}>
            <StyledItemButton
                className="information-item-button"
                disabled={state.requestState?.type !== 'secure' && state.requestState?.type !== 'insecure'}
                onClick={() => setType('certificate')}
            >
                <StyledItemIcon className="information-item-icon">
                    <StatusIcon state={state} />
                </StyledItemIcon>
                <StyledItemLabel className="information-item-label">{label}</StyledItemLabel>
            </StyledItemButton>
        </StyledPanelContainer>
    );
};

const CertificatePanel = ({ state, config, setType }: PanelProps) => {
    const { label, description } = getCertificateTranslate(state, config);

    const certificate = state.requestState?.certificate;
    return (
        <StyledPanelContainer className="panel-container" style={{ padding: '8px 0' }}>
            <StyledCertificateStatus>
                <StyledItemIcon className="information-item-icon">
                    <StatusIcon state={state} />
                </StyledItemIcon>
                <StyledItemLabelContainer>
                    <StyledItemLabel className="information-item-label">{label}</StyledItemLabel>
                    <StyledItemDescription className="information-item-description">
                        {description}
                    </StyledItemDescription>
                </StyledItemLabelContainer>
            </StyledCertificateStatus>
            {certificate && <StyledCertificateStatus>
                <StyledItemIcon className="information-item-icon">
                    <Certificate />
                </StyledItemIcon>
                <StyledItemLabelContainer>
                    <StyledItemLabel className="information-item-label">証明書の情報</StyledItemLabel>
                    <StyledItemDescription className="information-item-description">
                        <section>
                            <StyledItemSubLabel>主な情報</StyledItemSubLabel>
                            {certificate.subject.CN && <Fragment>名前: {certificate.subject.CN}<br /></Fragment>}
                            {certificate.subject.O && <Fragment>組織名: {certificate.subject.O}<br /></Fragment>}
                            {certificate.subject.OU && <Fragment>部門名: {certificate.subject.OU}<br /></Fragment>}
                            {certificate.subject.C && <Fragment>国/地域: {certificate.subject.C}<br /></Fragment>}
                            {certificate.subject.ST && <Fragment>都道府県: {certificate.subject.ST}<br /></Fragment>}
                            {certificate.subject.L && <Fragment>市区町村郡: {certificate.subject.L}</Fragment>}
                        </section>
                        <section>
                            <StyledItemSubLabel>発行者情報</StyledItemSubLabel>
                            {certificate.issuer.CN && <Fragment>名前: {certificate.issuer.CN}<br /></Fragment>}
                            {certificate.issuer.O && <Fragment>組織名: {certificate.issuer.O}<br /></Fragment>}
                            {certificate.issuer.OU && <Fragment>部門名: {certificate.issuer.OU}<br /></Fragment>}
                            {certificate.issuer.C && <Fragment>国/地域: {certificate.issuer.C}<br /></Fragment>}
                            {certificate.issuer.ST && <Fragment>都道府県: {certificate.issuer.ST}<br /></Fragment>}
                            {certificate.issuer.L && <Fragment>市区町村郡: {certificate.issuer.L}</Fragment>}
                        </section>
                        <section>
                            <StyledItemSubLabel>有効期間</StyledItemSubLabel>
                            {format(Date.parse(certificate.valid_from!!), 'yyyy/MM/dd HH:mm:ss')} から<br />
                            {format(Date.parse(certificate.valid_to!!), 'yyyy/MM/dd HH:mm:ss')} まで
                        </section>
                    </StyledItemDescription>
                </StyledItemLabelContainer>
            </StyledCertificateStatus>}
        </StyledPanelContainer>
    );
};

const getCertificateTranslate = (state: ViewState, config: UserConfig) => {
    const { windows: { app: { pageInformation: { certificate } } } } = getTranslate(config);

    if (!state.requestState || !state.requestState.type)
        return certificate.inSecure;

    switch (state.requestState.type) {
        case 'secure':
            return certificate.secure;
        case 'insecure':
            return certificate.inSecure;
        case 'file':
            return certificate.file;
        case 'source':
            return certificate.source;
        case 'search':
        case 'internal':
            return certificate.internal;
        case 'extension':
            return certificate.extension;
    }
};
