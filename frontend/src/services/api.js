import axios from 'axios';
export const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const getRepos = async (query = '') => {
    let url = `/repos`;

    if(query){
        url += `?q=${query}`
    }

    const response = await api.get(`/repos?q=${query}`);

    return response.data;
}

export const addRepo = async (urlNewRepo) => {
    const url = `/repos`;

    const res = await api.post(url, { url: urlNewRepo });

    return res.data;
}

export const deleteRepo = async (id) => {
    const url = `/repos/${id}`;

    const res = await api.delete(url);

    return res;
}

export const repoId = async (id) => {
    const url = `/repos/${id}`;

    const res = await api.get(url);

    return res.data;

}

export const updateRepo = async (urlRepo, id)=>{
    const url = `/repos/${id}`;

    const res = await api.put(url, { url: urlRepo });

    return res.data
}