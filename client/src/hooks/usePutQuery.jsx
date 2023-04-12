import {  useState } from "react"
import axios from "axios"


export const usePutQuery = (endpoint_path, data) =>{

    const [response,setResponse] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)


    const putRequest = async () => {
        try{
            setLoading(true)
            const response = await axios.put(process.env.REACT_APP_API_URL + endpoint_path, data)
            setResponse(response.data)
        }catch(err){
            setError(err)
        }finally{
            setLoading(false)
        }
    }
     
    return { putRequest, response, error, loading }

}