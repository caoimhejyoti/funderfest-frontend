import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// PAGES
import HomePage from "./pages/HomePage/HomePage.jsx";
import FestivalPage from "./pages/FestivalPage/FestivalPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/UserPages/LoginPage.jsx";
import CreateUserPage from "./pages/UserPages/CreateUserPage.jsx";

// COMPONENTS
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import Footer from "./components/Footer.jsx";
// import Header from "./components/Header.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/create-user", element: <CreateUserPage /> },
      { path: "/festival/:id", element: <FestivalPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <Header /> */}
      <RouterProvider router={router} />
      <Footer />
    </AuthProvider>
  </React.StrictMode>
);
