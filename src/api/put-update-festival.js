async function putUpdateFestival(festivalDetails, id) {
  console.log(JSON.stringify({ ...festivalDetails }));
  console.log(JSON.stringify({ id }));

  const url = `${import.meta.env.VITE_API_URL}/festivals/${id}/`;
  console.log(url);
  const token = window.localStorage.getItem("token");
  console.log(token);

  const updatedFestival = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      title: `${festivalDetails.title}`,
      description: `${festivalDetails.description}`,
      goal: festivalDetails.goal,
      image: `${festivalDetails.image}`,
      is_open: festivalDetails.is_open,
      date_created: festivalDetails.date_created,
      owner: festivalDetails.owner,
      tickets_available: festivalDetails.tickets_available,
      start_date: festivalDetails.start_date,
      end_date: festivalDetails.end_date,
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
