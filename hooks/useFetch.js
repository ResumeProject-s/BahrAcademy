import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (url, method = "GET", requestData) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: requestData,
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return [data, loading, error];
};

export default useFetch;
