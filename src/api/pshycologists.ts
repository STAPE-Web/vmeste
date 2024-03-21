import axios from "axios";

class Pshycologists {
    async get(sid: string, filters: { themes: string[], gender: string, familyTherapy: boolean, prices: number[] }) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/pshycologist/get`, {
            sid, filters
        }).then((res) => res.data)
    }

    async like(sid: string, action: "add", type: "tests", id: string) {
        console.log(sid, action, type, id)
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/favorite`, {
            sid, action, type, id
        }).then((res) => res.data)
    }
}

export default new Pshycologists()