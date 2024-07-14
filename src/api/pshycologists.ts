import axios from "axios";

class Pshycologists {
    async get(sid: string, filters: { themes: string[], gender: string, familyTherapy: string, prices: number[] }) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/pshycologist/get`, {
            sid, filters
        }).then((res) => res.data)
    }

    async like(sid: string, action: "add" | "delete", type: "psychologists", id: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/favorite`, {
            sid, action, type, id
        }).then((res) => res.data)
    }

    async getProfile(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/account/getProfile`, {
            sid
        }).then((res) => res.data)
    }

    async getMy(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/psychologist/mySessions`, {
            sid
        }).then((res) => res.data)
    }

    async addNote(sid: string, userId: string, note: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/psychologist/addNote`, {
            sid, userId, note
        }).then((res) => res.data)
    }

    async removeNote(sid: string, userId: string, index: number) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/psychologist/removeNote`, {
            sid, userId, index
        }).then((res) => res.data)
    }

    async getStatistics(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/psychologist/statistics`, {
            sid
        }).then((res) => res.data)
    }

    async payments(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/psychologist/payments`, {
            sid
        }).then((res) => res.data)
    }
}

export default new Pshycologists()