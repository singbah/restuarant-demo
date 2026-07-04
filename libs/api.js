import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/'

async function getBlogs(){
    try{
        const response = await axios.get(API_URL)
        const data = response.data;
        console.log(data)
        return data;
    }catch(error){
        console.log(error)
        console.log(error)
        return null;
    }
};

async function deleteStuff(url) {
    try{
        const response = await axios.delete(url);
        const data = response.data;
        console.log(data);
        return data
    }catch(error){
        console.log(error);
        return error
    }
}

async function postBlog(url, postData) {
    try{
        const response = await axios.post(`${API_URL}${url}`, postData);
        const data = response.data;
        console.log(data);
        return data
    }catch(error){
        console.log(error);
        return error
    }
}

async function GetData(url) {
    try{
        const response = await axios.post(`${API_URL}${url}`);
        const data = response.data;
        console.log(data);
        return data
    }catch(error){
        console.log(error);
        return error
    }
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true
});

export default api;

export {getBlogs, API_URL, api, postBlog, deleteStuff}