// HOOKS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
// API
import postCreateUser from "../api/post-create-user";
import postLogin from "../api/post-login";

function CreateUserForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      userDetails.firstName &&
      userDetails.lastName &&
      userDetails.email &&
      userDetails.username &&
      userDetails.password
    ) {
      postCreateUser(
        userDetails.firstName,
        userDetails.lastName,
        userDetails.email,
        userDetails.username,
        userDetails.password
      ).then((newUser) => {
        postLogin(newUser.username, userDetails.password)
          .then((response) => {
            window.localStorage.setItem("token", response.token);
            window.localStorage.setItem("username", userDetails.username);
            setAuth({ token: response.token });
          })
          .then(navigate("/")); 
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter First Name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter Last Name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Create username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Create Password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default CreateUserForm;
