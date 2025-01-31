import { APPLICATION_NAME } from '../utils';
import { Language } from './language';

export const Ja: Language = {
    common: {
        success: '成功',
        warning: '警告',
        error: 'エラー',
        information: '情報',
        yes: 'はい',
        no: 'いいえ',
        cancel: 'キャンセル',
        save: '保存',
        edit: '編集',
        add: '追加',
        remove: '削除',
        delete: '削除'
    },
    tasks: {
        addTab: '新しいタブ',
        addWindow: '新しいウィンドウ',
        openIncognitoWindow: 'プライベート ウィンドウを開く'
    },
    menus: {
        application: {
            newTab: '新しいタブ',
            newWindow: '新しいウィンドウ',
            openIncognitoWindow: 'プライベート ウィンドウを開く',

            bookmarks: 'ブックマーク',
            history: '履歴',
            downloads: 'ダウンロード',
            applications: 'アプリケーション',
            extensions: '拡張機能',

            print: '印刷',
            find: 'ページ内検索',
            share: '共有',

            settings: '設定',
            help: {
                label: 'ヘルプ'
            },
            close: '閉じる'
        },
        window: {
            app: {
                label: APPLICATION_NAME,

                about: `${APPLICATION_NAME} について`,
                services: 'サービス',
                hide: `${APPLICATION_NAME} を非表示にする`,
                hideOthers: 'その他を非表示にする',
                showAll: 'すべて表示',
                quit: `${APPLICATION_NAME} を終了`
            },
            file: {
                label: 'ファイル',

                newTab: '新しいタブを開く',
                newWindow: '新しいウィンドウを開く',
                openIncognitoWindow: 'プライベート ウィンドウを開く',
                savePage: 'ページの保存',
                print: '印刷',
                settings: '設定',
                closeTab: 'タブを閉じる',
                closeWindow: 'ウィンドウを閉じる',
                quit: `${APPLICATION_NAME} を終了`
            },
            edit: {
                label: '編集',

                undo: '元に戻す',
                redo: 'やり直す',
                cut: '切り取り',
                copy: 'コピー',
                paste: '貼り付け',
                pastePlainText: 'プレーン テキストとして貼り付け',
                delete: '削除',
                selectAll: 'すべて選択',
                find: '検索'
            },
            view: {
                label: '表示',

                fullScreen: '全画面表示の切り替え',
                toolbar: 'ツールバーの切り替え',
                sidebar: 'サイドバーの切り替え',
                zoomIn: 'ページを拡大',
                zoomOut: 'ページを縮小',
                zoomReset: 'ページのズームをリセット',
                viewSource: 'ページのソースを表示',
                devTool: 'デベロッパー ツール',
                appDevTool: 'デベロッパー ツール (ウィンドウ)'
            },
            navigation: {
                label: 'ナビゲーション',

                intelligentSearch: 'インテリジェント・サーチ',
                back: '前のページに戻る',
                forward: '次のページに進む',
                reload: '再読み込み',
                reloadIgnoringCache: '再読み込み (キャッシュの削除)',
                home: 'ホームページに移動',
                bookmarks: 'ブックマーク',
                history: '履歴',
                downloads: 'ダウンロード',
                applications: 'アプリケーション',
                extensions: '拡張機能'
            },
            tab: {
                label: 'タブ',

                addTab: '新しいタブを開く',
                removeTab: 'タブを閉じる',
                removeOtherTabs: '他のタブを閉じる',
                removeLeftTabs: '左側のタブを閉じる',
                removeRightTabs: '右側のタブを閉じる',
                duplicateTab: 'タブを複製',
                pinTab: 'タブをピン留め',
                unpinTab: 'タブのピン留めを解除',
                muteTab: 'タブをミュート',
                unmuteTab: 'タブのミュートを解除',
                prevTab: '前のタブを表示',
                nextTab: '次のタブを表示'
            },
            window: {
                label: 'ウィンドウ',

                addWindow: '新しいウィンドウを開く',
                openIncognitoWindow: 'プライベート ウィンドウを開く',
                removeWindow: 'ウィンドウを閉じる',
                removeOtherWindows: '他のウィンドウを閉じる',
                minimizeWindow: 'ウィンドウを最小化',
                maximizeWindow: 'ウィンドウを最大化',
                unmaximizeWindow: 'ウィンドウを元に戻す',
                toggleFullScreen: '全画面表示の切り替え',
                openProcessManager: 'プロセス マネージャーを開く'
            },
            user: {
                label: 'ユーザー',

                addUser: 'ユーザーを追加',
                removeUser: 'ユーザーを削除',
                editUser: 'ユーザーを編集'
            },
            help: {
                label: 'ヘルプ',

                help: 'ヘルプ',
                feedback: 'フィードバックの送信',
                openProcessManager: 'プロセス マネージャーを開く',
                about: `${APPLICATION_NAME} について`
            }
        },
        view: {
            link: {
                newTab: '新しいタブで開く',
                newWindow: '新しいウィンドウで開く',
                openIncognitoWindow: 'プライベート ウィンドウでリンクを開く',
                openAsAnotherUser: 'ほかのユーザーとしてリンクを開く',
                saveLink: '名前を付けてリンク先を保存',
                copyLink: 'リンクのアドレスをコピー'
            },
            image: {
                newTab: '新しいタブで画像を開く',
                saveImage: '名前を付けて画像を保存',
                copyImage: '画像をコピー',
                copyLink: '画像のアドレスをコピー'
            },
            editable: {
                emojiPanel: '絵文字パレット',
                undo: '元に戻す',
                redo: 'やり直す',
                cut: '切り取り',
                copy: 'コピー',
                paste: '貼り付け',
                pastePlainText: 'プレーン テキストとして貼り付け',
                selectAll: 'すべて選択'
            },
            selection: {
                copy: 'コピー',
                textSearch: '%n で「%t」を検索',
                textLoad: '%u に移動'
            },
            fullScreen: {
                fullScreenExit: '全画面表示を終了',
                toolBar: 'ツールバーの切り替え'
            },
            back: '戻る',
            forward: '進む',
            reload: '再読み込み',
            stop: '中止',
            media: {
                audioMute: 'タブをミュート',
                audioMuteExit: 'タブのミュートを解除',
                pictureInPicture: 'ピクチャー イン ピクチャー'
            },
            savePage: '名前を付けて保存',
            print: '印刷',
            viewSource: 'ページのソースを表示',
            devTool: 'デベロッパー ツール'
        },
        tab: {
            addTab: '新しいタブを開く',
            moveToWindow: 'このタブを新しいウィンドウに移動',
            reload: '再読み込み',
            stop: '中止',
            duplicateTab: 'タブを複製',
            pinTab: 'タブをピン留め',
            unpinTab: 'タブのピン留めを解除',
            muteTab: 'タブをミュート',
            unmuteTab: 'タブのミュートを解除',
            removeTab: 'タブを閉じる',
            removeOtherTabs: '他のタブを閉じる',
            removeLeftTabs: '左側のタブを閉じる',
            removeRightTabs: '右側のタブを閉じる'
        }
    },
    windows: {
        app: {
            title: APPLICATION_NAME,

            pageInformation: {
                label: 'ページ情報',

                certificate: {
                    secure: {
                        label: 'この接続は保護されています',
                        description: 'あなたがこのサイトに送信した情報（パスワード、クレジットカード情報など）が第三者に見られる事はありません。'
                    },
                    inSecure: {
                        label: 'このサイトへの接続は保護されていません',
                        description: 'このサイトでは機密情報（パスワード、クレジットカード情報など）を入力しないでください。悪意のあるユーザーに情報が盗まれる恐れがあります。'
                    },
                    file: {
                        label: 'ローカル ファイルを表示しています',
                        description: ''
                    },
                    source: {
                        label: 'ページのソースを表示しています',
                        description: ''
                    },
                    internal: {
                        label: `保護された ${APPLICATION_NAME} ページを表示しています`,
                        description: ''
                    },
                    extension: {
                        label: '拡張機能のページを表示しています',
                        description: ''
                    }
                }
            },

            addressBar: {
                placeholder: '%n で検索または URL を入力',
                searchEngine: {
                    suggested: '%k を押して %n で検索',
                    selected: '%n で検索'
                }
            }
        },
        processManager: {
            title: 'プロセス マネージャー'
        }
    },
    pages: {
        bookmarks: {
            title: 'ブックマーク',

            all: 'すべてのブックマーク',

            addBookmark: 'ブックマークを追加',
            addFolder: 'フォルダを追加',
            delete: '削除',
            edit: '編集',
            rename: '名前を変更',
            move: '移動',

            notFound: 'この場所に登録されているブックマークがありません。'
        },
        history: {
            title: '履歴',

            all: 'すべて',
            today: '今日',
            yesterday: '昨日',
            lastWeek: '先週',
            before: 'さらに前',

            notFound: 'この期間に閲覧したページはありません。'
        },
        downloads: {
            title: 'ダウンロード',

            notFound: 'ダウンロードしたファイルがありません。'
        },
        applications: {
            title: 'アプリケーション',

            notFound: 'インストールしたアプリケーションがありません。'
        },
        settings: {
            title: '設定',

            profileAndUsers: {
                title: 'プロファイルとユーザー'
            },
            privacyAndSecurity: {
                title: 'プライバシーとセキュリティ',

                privacy: {
                    title: 'プライバシー',

                    sendDNTRequest: 'サイトに「トラッキング拒否」リクエストを送信する'
                },
                history: {
                    title: '履歴',

                    save: '履歴を保存する',
                    delete: '閲覧履歴を削除する'
                },
                suggests: {
                    title: 'サジェスト',

                    search: 'Google 検索からサジェストする',
                    bookmarks: 'ブックマークからサジェストする',
                    history: '履歴からサジェストする'
                }
            },
            appearance: {
                title: 'デザインと外観',

                mode: {
                    title: 'テーマと配色',

                    system: 'システムの設定に合わせる',
                    light: 'ライト',
                    dark: 'ダーク',

                    tabColored: 'サイトに設定されているテーマカラーをタブに設定する'
                },
                theme: {
                    title: 'テーマ',

                    none: '既定',
                    morningFog: 'Morning fog',
                    icyMint: 'Icy mint',
                    islandGetaway: 'Island getaway'
                },
                tabPosition: {
                    title: 'タブとアドレスバーの配置',

                    topSingle: '上 (1行)',
                    topDouble: '上 (2行)',
                    left: '左',
                    right: '右'
                },
                button: {
                    title: '表示するボタンの選択',

                    home: 'ホーム',
                    bookmarks: 'ブックマーク',
                    history: '履歴',
                    downloads: 'ダウンロード',
                    applications: 'アプリケーション',
                    extensions: '拡張機能'
                }
            },
            pages: {
                title: '起動時、ホーム、新しいタブ',

                startup: {
                    title: '起動時',

                    newTab: '新しいタブ ページを開く',
                    prevSessions: '前回起動時に表示していたページを開く',
                    custom: '特定のページまたはページセットを開く'
                },
                home: {
                    title: 'ホーム',

                    button: {
                        name: 'ツールバーにホームボタンを表示',
                        description: 'ホームボタンを押した際に表示するページを設定'
                    },
                    newTab: '新しいタブ ページを開く',
                    custom: '特定のページを開く'
                }
            },
            search: {
                title: '検索とアドレスバー',

                suggests: {
                    title: 'サジェスト',

                    search: 'Google 検索からサジェストする',
                    bookmarks: 'ブックマークからサジェストする',
                    history: '履歴からサジェストする'
                },
                addressBar: {
                    title: 'アドレスバー',

                    defaultEngine: 'アドレスバーと右クリック メニューで使用する検索エンジン',
                    suggestEngine: {
                        primary: '@メンション や URL で登録されている検索エンジンをサジェストする',
                        secondary: 'サジェスト中に %k を押して選択した検索エンジンで検索する'
                    }
                }
            }
        }
    }
};
