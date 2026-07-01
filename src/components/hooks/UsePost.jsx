import { useState } from "react";
import axios from "axios";

export async function postDataFunc(url, data) {
  try {
    const res = await axios.post(url, data);

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      data: err.response?.data?.message || err.message,
    };
  }
}


export default function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  async function post(url, data) {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(url, data);

      setResponse(res.data);

      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    post,
    loading,
    error,
    response,
  };
}