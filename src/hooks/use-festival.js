import { useState, useEffect } from "react";
import getFestival from "../api/get-festival";

export default function useFestival(festivalId) {
  console.log(`inside useFestival()`);
  console.log(`festivalID: ${festivalId}`);
  const [festival, setFestival] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("Inside useEffect fnc"); //DEBUG: not being called
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
