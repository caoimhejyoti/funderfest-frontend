async function postCreatePledge(pledgeDetails) {
  console.log("post create new pledge:");
  console.log(
    JSON.stringify({
      ...pledgeDetails,
    })
  );

  const url = `${import.meta.env.VITE_API_URL}/pledges/`;
  const token = window.localStorage.getItem("token");

  const newPledge = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      ...pledgeDetails,
    }),
  });
  console.log("create pledge: ", newPledge);
  if (!newPledge.ok) {
    const fallbackError = "Error trying to create pledge";

    const data = await newPledge.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await newPledge.json();
}

export default postCreatePledge;
