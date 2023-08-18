"use client"
import { useCallback, useState } from "react";

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    
    const fetchRoute = async () => {
        setLoading(true);
        try {
            let response = await fetch(url);
            if (response?.ok && response.status) {
                setSuccess(true)
                setError(false);
            } else {
                setSuccess(false)
                setError(true);
            }
        } catch(err) {
            console.log(err);
            setError(err)
        } finally {
            setLoading(false);
        }
    }


    return {
        loading,
        error,
        success,
        fetchRoute,
    }
}

export default useFetch;
