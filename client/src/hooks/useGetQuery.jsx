import { useEffect, useState } from "react"
import axios from "axios"


export function useGetQuery(endpoint_path){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(process.env.REACT_APP_API_URL + endpoint_path)
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [endpoint_path])

    return { data, error, loading }

}