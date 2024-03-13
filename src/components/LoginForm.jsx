import { useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import postLogin from "../api/post-login";

// HOOKS
import { useAuth } from "../hooks/use-auth";

function LoginForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("false");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (credentials.username && password) {
      postLogin(credentials.username, password).then((response) => {
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("username", credentials.username);
        setAuth({ token: response.token });
        navigate("/");
      });
    }
  };

  return (
    <form className="container">
      <div className="space-y-12">
        {/* SECTION 1 - INPUTS */}
        <div className="border-b border-gray-900/10 pb-12">
          {/* USERNAME */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username:
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="epicUsername"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Enter Password:
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  // type="text"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  id="password"
                  autoComplete="password"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="superstrongpassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="check"> Show Password</label>
                <input
                  id="check"
                  type="checkbox"
                  value={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* SECTION 2 - SUBMIT */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
