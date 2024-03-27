import axios from "axios";

class Diary {
    async getDiary(sid: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/getDiary`, {
            sid
        }).then((res) => res.data)
    }

    async feel(sid: string, feelings: string[], stress: number, assessment: number, notes: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/feelingsDiary`, {
            sid, feelings, stress, assessment, notes
        }).then((res) => res.data)
    }
}

export default new Diary()