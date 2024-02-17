import { Link, Outlet } from "react-router-dom";

function NavBar() {
const user = window.localStorage.getItem("username")
  return (
    <>
      <nav>
        <p>{user}</p>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
