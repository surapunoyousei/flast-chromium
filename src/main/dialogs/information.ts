import { BrowserWindow } from 'electron';
import { DIALOG_INFORMATION_NAME } from '../../constants/dialog';
import { getBuildPath } from '../../utils/path';
import { IS_DEVELOPMENT } from '../../utils/process';
import { IUser } from '../interfaces/user';
import { Main } from '../main';
import { Dialog } from './dialog';

export const showInformationDialog = (user: IUser, browserWindow: BrowserWindow, x: number, y: number): Dialog => {
    const dialogManager = Main.dialogManager;

    const bounds = {
        width: 350,
        height: 460,
        x: x - 15,
        y
    };

    const dynamicDialog = dialogManager.getDynamic(DIALOG_INFORMATION_NAME);
    if (dynamicDialog) {
        dynamicDialog.browserWindow = browserWindow;
        dynamicDialog.bounds = bounds;
        dialogManager.show(dynamicDialog);
        return dynamicDialog;
    } else {
        const dialog = dialogManager.show(
            new Dialog(
                user,
                browserWindow,
                {
                    name: DIALOG_INFORMATION_NAME,
                    bounds,
                    onWindowBoundsUpdate: () => dialogManager.destroy(dialog),
                    onHide: () => dialogManager.destroy(dialog)
                }
            )
        );

        dialog.webContents.loadFile(getBuildPath('browser', 'information.html'));
        dialog.webContents.focus();

        dialog.webContents.once('dom-ready', () => {
            if (!IS_DEVELOPMENT) return;

            // 開発モードの場合はデベロッパーツールを開く
            // dialog.browserView.webContents.openDevTools({ mode: 'detach' });
        });

        return dialog;
    }
};
