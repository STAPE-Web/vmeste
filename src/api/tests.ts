import axios from "axios";

class Tests {
    async getAll(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/test/getAll`, {
            sid
        }).then((res) => res.data)
    }

    async getResult(sid: string, testId: string, answers: number[]) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/test/getResult`, {
            sid, answers, testId
        }).then((res) => res.data)
    }
}

export default new Tests()