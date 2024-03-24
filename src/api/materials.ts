import axios from "axios";

class Materials {
    async getAll(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/getAll`, {
            sid
        }).then((res) => res.data)
    }

    async like(sid: string, action: "add" | "delete", type: "tests" | "articles" | "videos", id: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/favorite`, {
            sid, action, type, id
        }).then((res) => res.data)
    }
}

export default new Materials()