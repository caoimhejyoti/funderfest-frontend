import { useState, useEffect } from "react";
import getFestival from "../api/get-festival";

export default function useFestival(festivalId) {
  // console.log(`inside useFestival()`); //Used for DEBUGGING
  // console.log(`festivalID: ${festivalId}`); //Used for DEBUGGING
  const [festival, setFestival] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getFestival(festivalId)
      .then((festival) => {
        setFestival(festival);
        console.log(`festvial: ${festival}`);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [festivalId]);
  return { festival, isLoading, error };
}
