import axios from "axios";

class Profile {
    async step1(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/changeLogin/step/1`, {
            sid
        }).then((res) => res.data)
    }

    async step2(sid: string, otp: number) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/changeLogin/step/2`, {
            sid, otp
        }).then((res) => res.data)
    }

    async step3(sid: string, newLogin: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/changeLogin/step/3`, {
            sid, newLogin
        }).then((res) => res.data)
    }

    async step4(sid: string, otp: number) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/changeLogin/step/4`, {
            sid, otp
        }).then((res) => res.data)
    }
}

export default new Profile()