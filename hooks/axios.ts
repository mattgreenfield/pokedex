import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2';

const useAxios = ({ url, method = 'get', config = {} }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get(url, config)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, config]);

  return { response, error, loading };
};

export default useAxios;
