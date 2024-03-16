async function putUpdateFestival(festivalDetails) {
  console.log(JSON.stringify({ ...festivalDetails }));

  const url = `${import.meta.env.VITE_API_URL}/festivals/`;
  const token = window.localStorage.getItem("token");

  const updatedFestival = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      ...festivalDetails,
    }),
  });
  console.log("updated festival: ", updatedFestival);

  if (!updatedFestival.ok) {
    const fallbackError = "Error trying to update festival";

    const data = await updatedFestival.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await updatedFestival.json();
}

export default putUpdateFestival;
