import { Link, Outlet } from "react-router-dom";

// HOOKS
import { useAuth } from "../hooks/use-auth";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const user = window.localStorage.getItem("username");

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    setAuth({ token: null });
  };
  return (
    <header>
      <img src="src/assets/Funderfest Logo inverted.png" />

      <nav>
        <p>{user}</p>
        <Link to="/">Home</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/create-user">Register</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Outlet />
    </header>
  );
}

export default NavBar;
