import axios from "axios";

const sid = JSON.parse(localStorage.getItem("sid") as string);

class Payment {
    async addPayment(cardId: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/addPayment`, {
            sid, cardId
        }).then((res) => res.data)
    }

    async paymentUrl(psychId: string, time: string, familyTherapy: boolean) {
        return await axios.post(`${import.meta.env.VITE_SERVER}/user/paymentUrl`, {
            sid, psychId, time, familyTherapy
        }).then((res) => res.data)
    }
}

export default new Payment()