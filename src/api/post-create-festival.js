async function postCreateFestival(
  title,
  description,
  goal,
  image,
  is_open,
  date_created,
  owner,
  tickets_available,
  start_date,
  end_date
) {
  console.log(
    JSON.stringify({
      title,
      description,
      goal,
      image,
      is_open,
      date_created,
      owner,
      tickets_available,
      start_date,
      end_date,
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
      title,
      description,
      goal,
      image,
      is_open,
      date_created,
      owner,
      tickets_available,
      start_date,
      end_date,
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
