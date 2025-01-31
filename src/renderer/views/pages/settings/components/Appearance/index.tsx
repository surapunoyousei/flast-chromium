import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AppearanceMode, AppearanceStyle, DefaultUserConfig, UserConfig } from '../../../../../../interfaces/user';
import { DeepPartial } from '../../../../../../utils';
import { isVertical } from '../../../../../../utils/design';
import { Applications, Bookmarks, Download, Extension, History, Home } from '../../../../../components/Icons';
import {
    PageTitle,
    RadioItem,
    Section,
    SectionContent,
    SectionTitle,
    SwitchItem
} from '../../../../../components/Page';
import { useTranslateContext } from '../../../../../contexts/translate';

export const Appearance = () => {
    const [userId, setUserId] = useState('');
    const [config, setConfig] = useState<UserConfig>(DefaultUserConfig);

    const { translate } = useTranslateContext();
    const translateSection = translate.pages.settings.appearance;

    useEffect(() => {
        window.flast.getUser().then(async (id) => {
            if (!id) return;
            setUserId(id);

            const userConfig = await window.flast.getUserConfig(id);
            setConfig(userConfig);
        });
    }, []);

    const setUserConfig = async (userConfig: DeepPartial<UserConfig>) => {
        const cfg = await window.flast.setUserConfig(userId, userConfig);
        await window.flast.setTheme(userId);
        setConfig(cfg);
    };

    return (
        <Fragment>
            <Helmet title={`${translateSection.title} - ${translate.pages.settings.title}`} />
            <PageTitle>{translateSection.title}</PageTitle>
            <Section>
                <SectionTitle>{translateSection.mode.title}</SectionTitle>
                <SectionContent>
                    <RadioItem<AppearanceMode>
                        primary={translateSection.mode.system}
                        name="mode"
                        value="system"
                        selectedValue={config.appearance.mode}
                        setSelected={(mode) => setUserConfig({ appearance: { mode } })}
                    />
                    <RadioItem<AppearanceMode>
                        primary={translateSection.mode.light}
                        name="mode"
                        value="light"
                        selectedValue={config.appearance.mode}
                        setSelected={(mode) => setUserConfig({ appearance: { mode } })}
                    />
                    <RadioItem<AppearanceMode>
                        primary={translateSection.mode.dark}
                        name="mode"
                        value="dark"
                        selectedValue={config.appearance.mode}
                        setSelected={(mode) => setUserConfig({ appearance: { mode } })}
                    />
                    <SwitchItem
                        primary={translateSection.mode.tabColored}
                        checked={config.appearance.tab_colored}
                        setChecked={(colored) => setUserConfig({ appearance: { tab_colored: colored } })}
                    />
                </SectionContent>
            </Section>
            <Section>
                <SectionTitle>{translateSection.tabPosition.title}</SectionTitle>
                <SectionContent>
                    <RadioItem<AppearanceStyle>
                        primary={translateSection.tabPosition.topSingle}
                        name="style"
                        value="top_single"
                        selectedValue={config.appearance.style}
                        setSelected={(style) => setUserConfig({ appearance: { style } })}
                    />
                    <RadioItem<AppearanceStyle>
                        primary={translateSection.tabPosition.topDouble}
                        name="style"
                        value="top_double"
                        selectedValue={config.appearance.style}
                        setSelected={(style) => setUserConfig({ appearance: { style } })}
                    />
                    <RadioItem<AppearanceStyle>
                        primary={translateSection.tabPosition.left}
                        name="style"
                        value="left"
                        selectedValue={config.appearance.style}
                        setSelected={(style) => setUserConfig({ appearance: { style } })}
                    />
                    <RadioItem<AppearanceStyle>
                        primary={translateSection.tabPosition.right}
                        name="style"
                        value="right"
                        selectedValue={config.appearance.style}
                        setSelected={(style) => setUserConfig({ appearance: { style } })}
                    />
                </SectionContent>
            </Section>
            <Section>
                <SectionTitle>{translateSection.button.title}</SectionTitle>
                <SectionContent>
                    <SwitchItem
                        icon={<Home />}
                        primary={translateSection.button.home}
                        checked={config.appearance.buttons.home}
                        setChecked={(home) => setUserConfig({ appearance: { buttons: { home } } })}
                    />
                    <SwitchItem
                        icon={<Bookmarks />}
                        primary={translateSection.button.bookmarks}
                        checked={config.appearance.buttons.bookmarks}
                        setChecked={(bookmarks) => setUserConfig({ appearance: { buttons: { bookmarks } } })}
                        disabled={isVertical(config.appearance.style)}
                    />
                    <SwitchItem
                        icon={<History />}
                        primary={translateSection.button.history}
                        checked={config.appearance.buttons.history}
                        setChecked={(history) => setUserConfig({ appearance: { buttons: { history } } })}
                        disabled={isVertical(config.appearance.style)}
                    />
                    <SwitchItem
                        icon={<Download />}
                        primary={translateSection.button.downloads}
                        checked={config.appearance.buttons.downloads}
                        setChecked={(downloads) => setUserConfig({ appearance: { buttons: { downloads } } })}
                        disabled={isVertical(config.appearance.style)}
                    />
                    <SwitchItem
                        icon={<Applications />}
                        primary={translateSection.button.applications}
                        checked={config.appearance.buttons.applications}
                        setChecked={(applications) => setUserConfig({ appearance: { buttons: { applications } } })}
                    />
                    <SwitchItem
                        icon={<Extension />}
                        primary={translateSection.button.extensions}
                        checked={config.appearance.buttons.extensions}
                        setChecked={(extensions) => setUserConfig({ appearance: { buttons: { extensions } } })}
                    />
                </SectionContent>
            </Section>
        </Fragment>
    );
};
