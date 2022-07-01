import axios from "axios";
import { useState, useEffect } from "react";
import { api } from "services";

export const useAxios = (request: string) => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    api
      .get(request, {
        cancelToken: cancelToken.token,
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setloading(!true);
      });

    return () => {
      return cancelToken.cancel();
    };
  }, [request]);

  if (!response) return { data: null };

  //@ts-ignore
  return { ...response, error, loading };
};
