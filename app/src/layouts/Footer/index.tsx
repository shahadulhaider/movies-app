import { FC } from "react";
import { Link } from "react-router-dom";
import css from "./Footer.module.css";

export const Footer: FC = () => {
  return (
    <footer>
      <div className={css.footer}>
        <Link to="/" className={css.logo}>
          Movies App
        </Link>
        <span className={css.tech}>
          Made with React + Redux + Typescript and Nest.JS
        </span>
        <span className={css.attribution}>
          &#169; jewel {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};
