import { useEffect, useState } from "react"
import axios from "axios"


export const useGetQuery = (endpoint_path) => {

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

        const getRequest = async () => {
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
        


    return { getRequest, data, error, loading }

}