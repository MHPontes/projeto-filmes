import axios from 'axios';
//BASE DA URL: https://api.themoviedb.org/3/

const api = axios.create({     //cria uma instância do axios com a baseURL da API
    baseURL: 'https://api.themoviedb.org/3/',
});

export default api;