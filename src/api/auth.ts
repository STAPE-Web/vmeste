import axios from "axios";

class Auth {
    async sendCode(login: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/sendCode`, {
            login
        }).then((res) => res.data)
    }

    async verifyCode(login: string, otp: number) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/verifyCode`, {
            login, otp
        }).then((res) => res.data)
    }

    async register(data: any) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/saveForm`, {
            ...data
        }).then((res) => res.data)
    }

    async getProfile(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/getProfile`, {
            sid
        }).then((res) => res.data)
    }
}

export default new Auth()