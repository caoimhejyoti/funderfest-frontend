import { useState, useEffect } from "react";
import getFestival from "../api/get-festival";

export default function useFestival(festivalId) {
  const [festival, setFestival] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getFestival(festivalId)
      .then((festival) => {
        setFestival(festival);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [festivalId]);
  return { festival, isLoading, error };
}
