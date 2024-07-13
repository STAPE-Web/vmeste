import axios from "axios";

class Payment {
    async pay() {
        return await axios.post(`https://api.yookassa.ru/v3/payments`, {
            amount: {
                value: 2300,
                currency: "RUB",
            },
            confirmation: {
                type: 'redirect',
                return_url: 'http://localhost:5173/',
            },
            capture: true,
            description: 'Описание платежа',
        },
            {
                auth: {
                    username: "419438",
                    password: "test_7yaAAKvOmA1GUK3X5Ex8dQsWQDZky33ajUAF4KU6WDk",
                },
            }).then((res) => res.data)
    }
}

export default new Payment()