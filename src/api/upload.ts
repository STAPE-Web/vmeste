import axios from "axios";

class Upload {
    async document(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return await axios.post(`${import.meta.env.VITE_SERVER}/document/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => res.data);
    }

    async image(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return await axios.post(`${import.meta.env.VITE_SERVER}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => res.data);
    }
}

export default new Upload()