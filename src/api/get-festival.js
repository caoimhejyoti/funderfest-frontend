async function getFestival(festivalId) {
  const url = `${import.meta.env.VITE_API_URL}/festivals/${festivalId}`;

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    const fallbackError = `Error fetching project with id ${festivalId}`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

// async function getFestival(festivalId) {
//   console.log("V2...Inside getFestival()");

//   const url = `${import.meta.env.VITE_API_URL}/festivals/${festivalId}`;

//   try {
//     const fetchResponse = await fetch(url, { method: "GET" });
//     const data = await fetchResponse.json();
//     console.log(`Data: ${JSON.stringify(data)}`); //WORKING!
//     return data;
//   } catch (e) {
//     return e;
//   }
// }

export default getFestival;
