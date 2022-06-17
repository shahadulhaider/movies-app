import { NavList } from "./navlist";
import { Link } from "react-router-dom";
import { FC } from "react";
import css from "./Navigation.module.css";

// prettier-ignore
export const Navigation: FC = () => {
  return (
      <nav className={css.navbar}>
        <Link to="/">Movies</Link>
        <NavList />
    </nav>
  )
}
