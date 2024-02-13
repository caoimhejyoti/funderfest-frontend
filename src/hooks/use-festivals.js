import { useState, useEffect } from "react";
import getFestivals from "../api/get-festivals";

export default function useFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getFestivals()
      .then((festivals) => {
        setFestivals(festivals);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);
  return { festivals, isLoading, error };
}
