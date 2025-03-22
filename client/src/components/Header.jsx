import React from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice.js";
import { logout } from "../redux/authSlice.js";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar className={"border-b-2"}>
      <Link
        to={"/"}
        className={
          "self-center whitespace-nowrap text-sm font-semibold dark:text-white sm:text-xl"
        }
      >
        <span
          className={
            "rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 text-white"
          }
        >
          Blog
        </span>{" "}
        App
      </Link>
      <form>
        <TextInput
          type={"text"}
          placeholder={"Search..."}
          rightIcon={AiOutlineSearch}
          className={"hidden lg:inline"}
        />
      </form>

      <Button className={"h-10 w-12 lg:hidden"} color={"gray"} pill>
        <AiOutlineSearch />
      </Button>

      <div className={"flex items-center gap-x-2 md:order-2"}>
        <Button
          className={"hidden h-10 w-12 sm:inline"}
          color={"gray"}
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>

        {isAuthenticated ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar img={user?.photoUrl} alt={user?.username} rounded />}
          >
            <Dropdown.Header>
              <span className={"block text-sm"}>@{user?.username}</span>
              <span className={"block truncate text-sm font-medium"}>
                {user?.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link href={"/"} active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
