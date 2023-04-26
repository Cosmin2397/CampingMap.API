import { useState } from "react"
import axios from "axios"


export const usePostQuery = (endpoint_path, data) => {

    const [response,setResponse] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)


    const postRequest = async () => {
        try{
            setLoading(true)
            const reqResponse = await axios.post(
                process.env.REACT_APP_API_URL + endpoint_path, 
                data,  
                { withCredentials: true }
            )
            setResponse(reqResponse)
        }catch(err){
            setError(err)
        }finally{
            setLoading(false)
        }
    }
        

    return { postRequest, response, error, loading }

}