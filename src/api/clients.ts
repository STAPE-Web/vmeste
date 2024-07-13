import axios from "axios";

class Clients {
    async get(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/psychologist/getClients`, {
            sid
        }).then((res) => res.data)
    }
}

export default new Clients()