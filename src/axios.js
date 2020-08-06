import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cashflower-e830f.firebaseio.com/'
});

export default instance;