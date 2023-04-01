import { useEffect, useState } from "react"
import axios from "axios"


export function usePostQuery(endpoint_path, data){

    const [response,setResponse] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.post(process.env.REACT_APP_API_URL + endpoint_path, data)
                    setResponse(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [endpoint_path, data])

    return { response, error, loading }

}