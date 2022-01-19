import {
    app,
    clipboard,
    ContextMenuParams,
    dialog,
    Menu,
    MenuItem,
    MenuItemConstructorOptions,
    nativeImage
} from 'electron';
import { getTranslate } from '../../languages/language';
import { IS_MAC } from '../../utils/process';
import { isURL } from '../../utils/url';
import { Main } from '../main';
import { IncognitoUser } from '../user/incognito';
import { NormalUser } from '../user/normal';
import { getEmptyMenuItemIcon, getMenuItemIcon, getMenuItemIconFromName, joinTo, resizeIcon } from '../utils/menu';
import { AppView } from '../views/app';
import { AppWindow } from '../windows/app';
import { Shortcuts } from './shortcuts';

export const getContextMenu = (window: AppWindow, view: AppView, params: ContextMenuParams) => {
    const translate = getTranslate(window.user.settings.config);
    const languageSection = translate.menus.view;

    const {
        linkURL,
        srcURL,
        hasImageContents,
        isEditable,
        editFlags: { canUndo, canRedo, canCut, canCopy, canPaste, canSelectAll },
        selectionText,
        mediaType
    } = params;
    const webContents = view.webContents;

    const fullscreenOptions: (MenuItem | MenuItemConstructorOptions)[] | undefined = window.browserWindow.isFullScreen() ? [
        {
            label: languageSection.fullScreen.fullScreenExit,
            icon: getMenuItemIconFromName('fullscreen_exit'),
            accelerator: Shortcuts.FULLSCREEN,
            click: () => window.browserWindow.setFullScreen(false)
        },
        { type: 'separator' }
    ] : undefined;

    const getSelectionText = (replaceSpace: boolean) => selectionText.replace(/([\n\t])+/g, replaceSpace ? ' ' : '').trim();
    const searchTemplateUrl = 'https://www.google.com/search?q=%s';

    const onDevToolClick = () => {
        (webContents.isDevToolsOpened() && webContents.devToolsWebContents) ? webContents.devToolsWebContents.focus() : webContents.openDevTools();
    };

    const linkOptions: (MenuItem | MenuItemConstructorOptions)[] | undefined = linkURL !== '' ? [
        {
            label: languageSection.link.newTab,
            icon: getMenuItemIconFromName('tab_add'),
            accelerator: Shortcuts.TAB_ADD,
            click: () => window.viewManager.add(linkURL)
        },
        {
            label: languageSection.link.newWindow,
            icon: getMenuItemIconFromName('window_add'),
            accelerator: Shortcuts.WINDOW_ADD,
            click: () => Main.windowManager.add(window.user, [linkURL])
        },
        {
            label: languageSection.link.openIncognitoWindow,
            icon: getMenuItemIconFromName('window_incognito'),
            accelerator: Shortcuts.WINDOW_INCOGNITO,
            click: () => {
                if (window.user instanceof NormalUser) {
                    const incognitoUser = Main.userManager.add(new IncognitoUser(window.user));
                    Main.windowManager.add(incognitoUser, [linkURL]);
                } else if (window.user instanceof IncognitoUser) {
                    const incognitoUser = Main.userManager.add(new IncognitoUser(window.user.fromUser));
                    Main.windowManager.add(incognitoUser, [linkURL]);
                }
            }
        },
        { type: 'separator' },
        {
            label: languageSection.link.saveLink,
            icon: getMenuItemIconFromName('save_as'),
            accelerator: Shortcuts.SAVE_AS,
            click: () => {
                dialog.showSaveDialog({
                    defaultPath: `${app.getPath('downloads')}/${webContents.getTitle()}`,
                    filters: [
                        { name: 'Web ページ', extensions: ['html'] }
                    ]
                }).then(({ canceled, filePath }) => {
                    if (canceled || !filePath) return;
                    webContents.savePage(filePath, 'HTMLComplete').then(() => {
                        console.log('Page was saved successfully.');
                    }).catch((err) => {
                        if (!err) console.log('Page Save successfully');
                    });
                });
            }
        },
        {
            label: languageSection.link.copyLink,
            icon: getMenuItemIconFromName('copy_link'),
            accelerator: Shortcuts.EDIT_COPY,
            click: () => {
                clipboard.clear();
                clipboard.writeText(linkURL);
            }
        }
    ] : undefined;

    const imageOptions: (MenuItem | MenuItemConstructorOptions)[] | undefined = hasImageContents ? [
        {
            label: languageSection.image.newTab,
            icon: getMenuItemIconFromName('image_add'),
            click: () => window.viewManager.add(srcURL)
        },
        {
            label: languageSection.image.saveImage,
            icon: getMenuItemIconFromName('save_as_image'),
            click: () => view.webContents.downloadURL(srcURL)
        },
        {
            label: languageSection.image.copyImage,
            icon: getMenuItemIconFromName('copy_image'),
            click: () => {
                const img = nativeImage.createFromDataURL(srcURL);

                clipboard.clear();
                clipboard.writeImage(img);
            }
        },
        {
            label: languageSection.image.copyLink,
            icon: getEmptyMenuItemIcon(),
            click: () => {
                clipboard.clear();
                clipboard.writeText(srcURL);
            }
        }
    ] : undefined;

    const searchOptions: (MenuItem | MenuItemConstructorOptions)[] | undefined = selectionText !== '' ? [
        {
            label: languageSection.selection.copy,
            icon: getMenuItemIconFromName('copy'),
            accelerator: Shortcuts.EDIT_COPY,
            enabled: canCopy,
            click: () => webContents.copy()
        },
        {
            label: languageSection.selection.textSearch.replace('%n', 'Google').replace('%t', getSelectionText(true)),
            icon: getMenuItemIconFromName('search'),
            visible: canCopy && !isURL(getSelectionText(true)),
            click: () => window.viewManager.add(searchTemplateUrl.replace('%s', encodeURIComponent(getSelectionText(true))))
        },
        {
            label: languageSection.selection.textLoad.replace('%u', getSelectionText(false)),
            icon: getMenuItemIconFromName('external_link'),
            visible: canCopy && isURL(getSelectionText(false)),
            click: () => window.viewManager.add(getSelectionText(false))
        },
        {
            label: languageSection.print,
            icon: getMenuItemIconFromName('print'),
            accelerator: Shortcuts.PRINT,
            click: () => webContents.print()
        }
    ] : undefined;

    const editableEmojiPanelOptions: (MenuItem | MenuItemConstructorOptions)[] = app.isEmojiPanelSupported() ? [
        {
            label: languageSection.editable.emojiPanel,
            icon: getMenuItemIconFromName('emoji'),
            accelerator: Shortcuts.EDIT_SHOW_EMOJI_PANEL,
            click: () => app.showEmojiPanel()
        },
        { type: 'separator' }
    ] : [];

    const editableSearchOptions: (MenuItem | MenuItemConstructorOptions)[] = selectionText !== '' ? [
        { type: 'separator' },
        {
            label: languageSection.selection.textSearch.replace('%n', 'Google').replace('%t', getSelectionText(true)),
            icon: getMenuItemIconFromName('search'),
            visible: canCopy && !isURL(getSelectionText(true)),
            click: () => window.viewManager.add(searchTemplateUrl.replace('%s', encodeURIComponent(getSelectionText(true))))
        },
        {
            label: languageSection.selection.textLoad.replace('%u', getSelectionText(false)),
            icon: getMenuItemIconFromName('external_link'),
            visible: canCopy && isURL(getSelectionText(false)),
            click: () => window.viewManager.add(getSelectionText(false))
        },
        {
            label: languageSection.print,
            icon: getMenuItemIconFromName('print'),
            accelerator: Shortcuts.PRINT,
            click: () => webContents.print()
        }
    ] : [];

    const editableOptions: (MenuItem | MenuItemConstructorOptions)[] | undefined = isEditable ? [
        ...editableEmojiPanelOptions,
        {
            label: languageSection.editable.undo,
            icon: getMenuItemIconFromName('undo'),
            accelerator: Shortcuts.EDIT_UNDO,
            enabled: canUndo,
            click: () => webContents.undo()
        },
        {
            label: languageSection.editable.redo,
            icon: getMenuItemIconFromName('redo'),
            accelerator: Shortcuts.EDIT_REDO,
            enabled: canRedo,
            click: () => webContents.redo()
        },
        { type: 'separator' },
        {
            label: languageSection.editable.cut,
            icon: getMenuItemIconFromName('cut'),
            accelerator: Shortcuts.EDIT_CUT,
            enabled: canCut,
            click: () => webContents.cut()
        },
        {
            label: languageSection.editable.copy,
            icon: getMenuItemIconFromName('copy'),
            accelerator: Shortcuts.EDIT_COPY,
            enabled: canCopy,
            click: () => webContents.copy()
        },
        {
            label: languageSection.editable.paste,
            icon: getMenuItemIconFromName('paste'),
            accelerator: Shortcuts.EDIT_PASTE,
            enabled: canPaste,
            click: () => webContents.pasteAndMatchStyle()
        },
        {
            label: languageSection.editable.pastePlainText,
            icon: getMenuItemIconFromName('paste_as_plain_text'),
            accelerator: Shortcuts.EDIT_PASTE_AS_PLAIN_TEXT,
            enabled: canPaste,
            click: () => webContents.paste()
        },
        {
            label: languageSection.editable.selectAll,
            icon: getMenuItemIconFromName('select_all'),
            accelerator: Shortcuts.EDIT_SELECT_ALL,
            enabled: canSelectAll,
            click: () => webContents.selectAll()
        },
        ...editableSearchOptions
    ] : undefined;

    const developOptions: (MenuItem | MenuItemConstructorOptions)[] = [
        {
            label: languageSection.devTool,
            icon: getMenuItemIconFromName('inspect'),
            accelerator: Shortcuts.DEVELOPER_TOOLS_1,
            click: onDevToolClick
        }
    ];

    if (linkOptions || imageOptions || searchOptions) {
        return Menu.buildFromTemplate(joinTo([linkOptions, imageOptions, searchOptions, developOptions]));
    } else if (editableOptions) {
        return Menu.buildFromTemplate(joinTo([editableOptions, developOptions]));
    } else {
        const mediaOptions: (MenuItem | MenuItemConstructorOptions)[] = mediaType === 'audio' || mediaType === 'video' || webContents.isCurrentlyAudible() ? [
            { type: 'separator' },
            {
                label: view.isMuted() ? languageSection.media.audioMuteExit : languageSection.media.audioMute,
                icon: getMenuItemIconFromName(`speaker${webContents.audioMuted ? '' : '_muted'}`),
                click: () => view.setMuted(!view.isMuted())
            },
            {
                label: languageSection.media.pictureInPicture,
                icon: getMenuItemIconFromName('picture_in_picture'),
                click: () => {
                    webContents.executeJavaScript('api.togglePictureInPicture()');
                }
            }
        ] : [];

        const extensionOptions: (MenuItem | MenuItemConstructorOptions)[] = view.user.type === 'normal' ? view.user.session.extensions.getContextMenuItems(view.browserView.webContents, params).map((item) => ({
            ...item,
            icon: typeof item.icon === 'object' ? resizeIcon(item.icon) : (item.icon ? getMenuItemIcon(item.icon) : getEmptyMenuItemIcon())
        })) : [];

        const genericOptions: (MenuItem | MenuItemConstructorOptions)[] = [
            {
                label: languageSection.back,
                icon: getMenuItemIconFromName('arrow_left'),
                accelerator: Shortcuts.NAVIGATION_BACK,
                enabled: view.canGoBack(),
                click: () => view.back()
            },
            {
                label: languageSection.forward,
                icon: getMenuItemIconFromName('arrow_right'),
                accelerator: Shortcuts.NAVIGATION_FORWARD,
                enabled: view.canGoForward(),
                click: () => view.forward()
            },
            {
                label: !view.isLoading() ? languageSection.reload : languageSection.stop,
                icon: getMenuItemIconFromName(!view.isLoading() ? 'reload' : 'remove'),
                accelerator: Shortcuts.NAVIGATION_RELOAD_1,
                click: () => {
                    !view.isLoading() ? webContents.reload() : webContents.stop();
                }
            },
            ...mediaOptions,
            { type: 'separator' },
            {
                label: languageSection.savePage,
                icon: getMenuItemIconFromName('save_as'),
                accelerator: Shortcuts.SAVE_AS,
                click: () => {
                    dialog.showSaveDialog({
                        defaultPath: `${app.getPath('downloads')}/${webContents.getTitle()}`,
                        filters: [
                            { name: 'Web ページ', extensions: ['html'] }
                        ]
                    }).then(({ canceled, filePath }) => {
                        if (canceled || !filePath) return;
                        webContents.savePage(filePath, 'HTMLComplete').then(() => {
                            console.log('Page was saved successfully.');
                        }).catch((err) => {
                            if (!err) console.log('Page Save successfully');
                        });
                    });
                }
            },
            {
                label: languageSection.print,
                icon: getMenuItemIconFromName('print'),
                accelerator: Shortcuts.PRINT,
                click: () => webContents.print()
            },
            { type: 'separator' },
            ...extensionOptions,
            { type: 'separator' },
            {
                label: languageSection.viewSource,
                icon: getMenuItemIconFromName('view_source'),
                accelerator: Shortcuts.VIEW_SOURCE,
                enabled: !view.getURL().startsWith('view-source:'),
                click: () => {
                    const appView = window.viewManager.add('about:blank');
                    appView.load(`view-source:${view.getURL()}`);
                }
            },
            {
                label: languageSection.devTool,
                icon: getMenuItemIconFromName('inspect'),
                accelerator: Shortcuts.DEVELOPER_TOOLS_1,
                click: onDevToolClick
            }
        ];

        return Menu.buildFromTemplate(joinTo([fullscreenOptions, genericOptions]));
    }
};

export const getTabMenu = (window: AppWindow, view: AppView) => {
    const translate = getTranslate(window.user.settings.config);

    const viewManager = window.viewManager;

    const languageSection = translate.menus.tab;
    return Menu.buildFromTemplate(
        [
            {
                label: languageSection.addTab,
                icon: !IS_MAC ? getMenuItemIconFromName('tab_add') : undefined,
                accelerator: Shortcuts.TAB_ADD,
                click: () => viewManager.add()
            },
            {
                label: languageSection.moveToWindow,
                icon: !IS_MAC ? getMenuItemIconFromName('tab_move_to_window') : undefined
                // click: () => view.forward()
            },
            { type: 'separator' },
            {
                label: !view.isLoading() ? languageSection.reload : languageSection.stop,
                icon: !IS_MAC ? getMenuItemIconFromName(!view.isLoading() ? 'reload' : 'remove') : undefined,
                accelerator: Shortcuts.NAVIGATION_RELOAD_1,
                click: () => !view.isLoading() ? view.reload() : view.stop()
            },
            {
                label: languageSection.duplicate,
                icon: !IS_MAC ? getMenuItemIconFromName('tab_duplicate') : undefined,
                accelerator: Shortcuts.TAB_DUPLICATE,
                click: () => viewManager.add(view.getURL())
            },
            {
                label: !view.isPinned() ? languageSection.pin : languageSection.unpin,
                icon: !IS_MAC ? getMenuItemIconFromName(!view.isPinned() ? 'pin' : 'unpin') : undefined,
                accelerator: Shortcuts.TAB_PIN,
                click: () => view.setPinned(!view.isPinned())
            },
            {
                label: !view.isMuted() ? languageSection.mute : languageSection.unmute,
                icon: !IS_MAC ? getMenuItemIconFromName(`speaker${view.isMuted() ? '' : '_muted'}`) : undefined,
                accelerator: Shortcuts.TAB_MUTE,
                click: () => view.setMuted(!view.isMuted())
            },
            { type: 'separator' },
            {
                label: languageSection.removeTab,
                icon: !IS_MAC ? getMenuItemIconFromName('tab_remove') : undefined,
                accelerator: Shortcuts.TAB_REMOVE,
                click: () => viewManager.remove(view.id)
            },
            {
                label: languageSection.removeOtherTabs,
                icon: !IS_MAC ? getMenuItemIconFromName('tab_remove_all') : undefined,
                enabled: viewManager.getViews().filter((v) => v.id !== view.id).length > 0,
                click: () => viewManager.removeOthers(view.id)
            },
            {
                label: languageSection.removeLeftTabs,
                icon: !IS_MAC ? getEmptyMenuItemIcon() : undefined,
                enabled: viewManager.getLeftViews(view.id).length > 0,
                click: () => viewManager.removeLefts(view.id)
            },
            {
                label: languageSection.removeRightTabs,
                icon: !IS_MAC ? getEmptyMenuItemIcon() : undefined,
                enabled: viewManager.getRightViews(view.id).length > 0,
                click: () => viewManager.removeRights(view.id)
            }
        ]
    );
};
