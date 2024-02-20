async function postCreateUser(firstName, lastName, email, username, password) {
  console.log(
    JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    })
  );
  const url = `${import.meta.env.VITE_API_URL}/users/create-user/`;
  const token = window.localStorage.getItem("token");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Token ${token}`,
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    }),
  });
  console.log("create user: ", response);
  if (!response.ok) {
    const fallbackError = "Error trying to create user";

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }
  return await response.json();
}

export default postCreateUser;

// if fails - catch error
// pass response throug hto loigin
// create user resulting in auth tokenb?
