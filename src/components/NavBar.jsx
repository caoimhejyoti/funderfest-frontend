import { Link, Outlet } from "react-router-dom";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// HOOKS
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // NOTE: Use Effect used to confirm React reloads.
  // useEffect(() => {
  //   console.log("Navbar mounted");
  //   return () => {
  //     console.log("Navbar unmounted");
  //   };
  // }, []);
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("userID");
    setAuth({ token: null, username: null, userID: null });
  };
  return (
    <>
      <header className="flex justify-items-stretch">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 m-1">
            <a href="/" className="-m-1.5 p-1.5">
              <img
                src="https://github.com/caoimhejyoti/funderfest-frontend/blob/main/src/assets/Funderfest%20Logo%20inverted.png?raw=true"
                className="h-20 w-auto"
                alt="FunderFest Events logo"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open Menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </Link>
            {auth.token ? (
              <Link
                to="/create-festival"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Create Your Event
              </Link>
            ) : (
              <Link
                to="/create-user"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Register
              </Link>
            )}

            <Link
              to="/about"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Contact
            </Link>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {auth.token ? (
              <Link
                to="/"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <img
                  src="https://github.com/caoimhejyoti/funderfest-frontend/blob/main/src/assets/Funderfest%20Logo%20inverted.png?raw=true"
                  className="h-10 w-auto"
                  alt="FunderFest Events logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close Menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to="/"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Home
                  </Link>

                  <Link
                    to="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact
                  </Link>
                </div>
                <div className="py-6">
                  {auth.token ? (
                    <>
                      <Link
                        to="/"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                      <Link
                        to="/create-festival"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Create Your Event
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Login
                      </Link>
                      <Link
                        to="/create-user"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <Outlet />
    </>
  );
}

export default NavBar;
