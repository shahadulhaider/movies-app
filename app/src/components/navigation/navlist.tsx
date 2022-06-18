import { FC, MouseEvent } from "react";
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logOut, selectUsername } from "store/slices/userSlice";
import css from "./Navigation.module.css";
import { NavItem } from "./navItem";

export const NavList: FC = () => {
  const username = useAppSelector(selectUsername);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<Element>) => {
    e.stopPropagation();
    dispatch(logOut());
    navigate("/");
  };

  const loggenInItems = username && (
    <>
      {/* <NavItem to="/add-favorite">
        <span className={css.icon}>
          <FaPlus />
        </span>{" "}
        Add New Movie
      </NavItem> */}
      <NavItem to={""}>
        <span onClick={(e) => handleClick(e)} className={css.icon}>
          <FaSignOutAlt />
        </span>{" "}
        <span onClick={(e) => handleClick(e)}> Logout</span>
      </NavItem>
      <NavItem to={`/profile/${username}`} username={username}></NavItem>
    </>
  );

  const registerItems = (
    <>
      <NavItem to="/login">
        <span className={css.icon}>
          <FaSignInAlt />
        </span>{" "}
        Sign in
      </NavItem>
      <NavItem to="/register">
        <span className={css.icon}>
          <FaUserAlt />
        </span>{" "}
        Sign up
      </NavItem>
    </>
  );

  return (
    <ul>
      <>
        <NavItem to="/">
          <span className={css.icon}>
            <FaHome />
          </span>{" "}
          Home
        </NavItem>
        {username ? loggenInItems : registerItems}
      </>
    </ul>
  );
};
