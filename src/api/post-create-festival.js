async function postCreateFestival(festivalDetails) {
  console.log(
    JSON.stringify({
      ...festivalDetails,
    })
  );

  const url = `${import.meta.env.VITE_API_URL}/festivals/`;
  const token = window.localStorage.getItem("token");

  const newFestival = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      ...festivalDetails,
    }),
  });
  console.log("create festival: ", newFestival);
  if (!newFestival.ok) {
    const fallbackError = "Error trying to create festival";

    const data = await newFestival.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await newFestival.json();
}

export default postCreateFestival;
