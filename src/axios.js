import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://proyectoprueba-af47a.firebaseio.com/'
});

export default instance;