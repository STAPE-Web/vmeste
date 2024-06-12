import axios from "axios";

class Session {
    async book(data: any) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/bookSession`, {
            ...data
        }).then((res) => res.data)
    }

    async get(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/getSessions`, {
            sid
        }).then((res) => res.data)
    }

    async cancel(data: any) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/sessions/cancel`, {
            ...data
        }).then((res) => res.data)
    }

    async promo(data: any) {
        console.log(data)
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/usePromo`, {
            ...data
        }).then((res) => res.data)
    }

    async move(data: any) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/moveSession`, {
            ...data
        }).then((res) => res.data)
    }

    async add(sid: string, time: string[]) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/psychologist/addSessions`, {
            sid, time
        }).then((res) => res.data)
    }
}

export default new Session()