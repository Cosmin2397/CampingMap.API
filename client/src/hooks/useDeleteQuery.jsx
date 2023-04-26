import { useState } from "react"
import axios from "axios"


export const useDeleteQuery = (endpoint_path) => {

    const [response,setResponse] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)


    const deleteRequest = async () => {
        try{
            setLoading(true)
            const response = await axios.delete(
                process.env.REACT_APP_API_URL + endpoint_path, 
                { withCredentials: true }
            )
            setResponse(response)
        }catch(err){
            setError(err)
        }finally{
            setLoading(false)
        }
    }
        

    return { deleteRequest, response, error, loading }

}