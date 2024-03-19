import axios from "axios";

class Tests {
    async getAll(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/test/getAll`, {
            sid
        }).then((res) => res.data)
    }
}

export default new Tests()