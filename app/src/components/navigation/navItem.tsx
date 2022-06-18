import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

interface NavItemProps {
  to: string;
  username?: string;
  children?: ReactNode;
}

export const NavItem: FC<NavItemProps> = ({ to, username, children }) => {
  return (
    <li>
      <NavLink to={to}>
        <>
          {username && (
            <span className={css.user}>
              {username.slice(0, 2).toUpperCase()}
            </span>
          )}
          {children}
        </>
      </NavLink>
    </li>
  );
};
