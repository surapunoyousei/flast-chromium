import deepmerge from 'deepmerge';
import { DefaultUserConfig, UserConfig } from '../../../interfaces/user';
import { APPLICATION_PROTOCOL, APPLICATION_WEB_HOME, DeepPartial } from '../../../utils';
import { isURL } from '../../../utils/url';
import { ISettings, IUser } from '../../interfaces/user';
import { NormalUser } from '../normal';

export class IncognitoSettings implements ISettings {

    public readonly user: IUser;

    private _config: UserConfig = DefaultUserConfig;

    public constructor(user: IUser, fromUser: NormalUser) {
        this.user = user;

        this._config = fromUser.settings.config;
    }

    public get startupUrls(): string[] {
        const { mode, urls } = this._config.pages.startup;
        switch (mode) {
            case 'new_tab':
                return [`${APPLICATION_PROTOCOL}://${APPLICATION_WEB_HOME}`];
            case 'prev_sessions':
                return [];
            case 'custom':
                return urls.filter((url) => url && isURL(url));
        }
    }

    public get homeUrl(): string {
        const { mode, url } = this._config.pages.home;
        return mode === 'custom' && url && isURL(url) ? url : `${APPLICATION_PROTOCOL}://${APPLICATION_WEB_HOME}`;
    }

    public get config(): UserConfig {
        return this._config;
    }

    public set config(data: DeepPartial<UserConfig>) {
        this._config = deepmerge<UserConfig>(this._config, data as any);
    }
}
