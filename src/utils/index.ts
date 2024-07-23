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

export const generateYearsArray = (startYear: number): string[] => {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let year = startYear; year <= currentYear; year++) {
        years.push(String(year));
    }
    return years;
};

export function fillPaymentColor(type: string) {
    switch (type) {
        case "Запланировано": return "#F8CB2F"
        case "Выплачено": return "#92D35E"
    }
}

export function calculateSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatType(type: string) {
    switch (type) {
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return "DOCX"
        case "application/pdf": return "PDF"
        case "application/msword": return "DOC"
        case "image/png": return "PNG"
        case "image/jpeg": return "JPEG"

    }
}

export function formatMethods(name: string) {
    switch (name) {
        case "Психоаналитическая терапия": return "Психоанализ"
        case "Гештальт-терапия": return "Гештальтпсихология"
        case "КПТ": return "Когнитивно-поведенческая психология"
        case "Экзистенциальная психотерапия": return "Экзистенциальная психология"
        case "Понимающая психотерапия / клиент-центрированный подход": return "Клиент-центрированная терапия"
        default: return name
    }
}

export function formatTherapy(name: string) {
    switch (name) {
        case "Индивидуальные": return "Индивидуальная"
        case "Парные": return "Парная"
        default: return name
    }
}

export function formatFreeTime(activeMonth: number, selectedDay: number, time: string, activeYear: number) {
    const month = String(activeMonth + 1).length === 1 ? `0${activeMonth + 1}` : activeMonth + 1
    const day = String(selectedDay).length === 1 ? `0${selectedDay}` : selectedDay
    const formatTime = time.split(" - ")[0]
    return `${activeYear}-${month}-${day} ${formatTime}:0.00`
}

export function getYearWord(number: number): string {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'лет';
    } else if (lastDigit === 1) {
        return 'год';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'года';
    } else {
        return 'лет';
    }
}

export function isPastTime(month: number, day: number, time: string, year: number): boolean {
    const hours = Number(time.split(':')[0])
    const selectedDateTime = new Date(year, month, day, hours, 0);
    return selectedDateTime < new Date();
}

export function isPastTime2(time: string): boolean {
    const selectedDateTime = new Date(time);
    return selectedDateTime > new Date();;
}

export function getSessionWord(count: number) {
    if (count === 1) {
        return "сессия";
    } else if (count >= 2 && count <= 4) {
        return "сессии";
    } else {
        return "сессий";
    }
}

export function formatDate(dateString: string) {
    const formattedDate = new Date(dateString);
    if (isNaN(formattedDate.getTime())) {
        throw new Error('Invalid date');
    }

    const day = ('0' + formattedDate.getDate()).slice(-2);
    const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
    const year = formattedDate.getFullYear();

    return `${day}.${month}.${year}`;
}

export const parseDateString = (dateString: string): Date => {
    const [datePart, timePart] = dateString.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
};
