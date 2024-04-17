import CryptoJS from 'crypto-js';
import { ZIM } from 'zego-zim-web';

export const appConfig = {
    appID: 111965558,
    serverSecret: import.meta.env.VITE_CHAT_SECRET,
};

export function generateToken(userID: string, seconds: number): string {
    if (!userID) throw new Error('generateToken error: params invalid.');

    const time = (Date.now() / 1000) | 0;
    const body = {
        app_id: Number(appConfig.appID),
        user_id: String(userID),
        nonce: (Math.random() * 2147483647) | 0,
        ctime: time,
        expire: time + Number(seconds || 7200),
    };

    const key = CryptoJS.enc.Utf8.parse(appConfig.serverSecret);
    let iv = Math.random().toString().substring(2, 18);
    if (iv.length < 16) iv += iv.substring(0, 16 - iv.length);

    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(body), key, { iv: CryptoJS.enc.Utf8.parse(iv) }).toString();
    const ciphert = new Uint8Array(Array.from(atob(ciphertext)).map((val) => val.charCodeAt(0)));
    const len_ciphert = ciphert.length;

    const uint8 = new Uint8Array(8 + 2 + 16 + 2 + len_ciphert);
    // expire: 8
    uint8.set([0, 0, 0, 0]);
    uint8.set(new Uint8Array(new Int32Array([body.expire]).buffer).reverse(), 4);
    // iv length: 2
    uint8[8] = iv.length >> 8;
    uint8[9] = iv.length - (uint8[8] << 8);
    // iv: 16
    uint8.set(new Uint8Array(Array.from(iv).map((val) => val.charCodeAt(0))), 10);
    // ciphertext length: 2
    uint8[26] = len_ciphert >> 8;
    uint8[27] = len_ciphert - (uint8[26] << 8);
    // ciphertext
    uint8.set(ciphert, 28);

    const token = `04${btoa(String.fromCharCode(...Array.from(uint8)))}`;
    // @ts-ignore
    window.zimtoken = token;
    console.log('generateToken', iv.length, body, token);

    return token;
}

export function formatTime(time: number, isSecond?: boolean) {
    if (!time) return 0;
    return isSecond ? new Date(time).toLocaleString().slice(-8) : new Date(time).toLocaleString().slice(5, -3);
}

export const callModeMap = ['General', 'Advanced'];
export const callStateMap = ['', 'Started', 'Ended'];
export const callUserStateMap: any = {
    '-1': 'Unknown',
    0: 'Inviting',
    1: 'Accepted',
    2: 'Rejected',
    3: 'Cancelled',
    5: 'Received',
    6: 'Timeout',
    7: 'Quit',
    8: 'Ended',
};
export function callUserTagType(state: number, caller: boolean): any {
    return caller ? 'success' : state == 2 || state == 3 || state == 6 ? 'danger' : '';
}

export const avatarPrefix = 'https://storage.zego.im/zim/example/web/assets/';
export const avatarOptions = [
    { label: '1.jpeg', value: '1.jpeg' },
    { label: '2.jpeg', value: '2.jpeg' },
    { label: '3.jpeg', value: '3.jpeg' },
    { label: '4.jpeg', value: '4.jpeg' },
    { label: '5.jpeg', value: '5.jpeg' },
];

const getZIM = () => ZIM;
getZIM().create(appConfig);
export const zim = getZIM().getInstance() as ZIM;
export const SDKVersion = getZIM().getVersion();