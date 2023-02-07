import axios from 'axios';

// ViaCep

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws'
});

export default api;