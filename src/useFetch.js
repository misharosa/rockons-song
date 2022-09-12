import { useState, useEffect } from "react"
import axios from "axios";

export const useFetch = ( url ) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        if (url) {
         axios(url)
             .then(res => setData(res.data))
             .catch(e => console.log(e.message))
        }
    },[url])

    return {
        data,
    }
}