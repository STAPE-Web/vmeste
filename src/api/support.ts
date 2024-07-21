import axios from "axios";

class Support {
    async sendMessage(sid: string, msg: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/createTicket`, {
            sid, msg
        }).then((res) => res.data)
    }
}

export default new Support()