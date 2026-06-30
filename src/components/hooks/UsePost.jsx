
import axios from "axios";

export default async function usePost(url, postData){
    try{
        const resp = await axios.post(url, postData),

        // console.log(data)
    }catch(err){
        console.log(err)
    }
}