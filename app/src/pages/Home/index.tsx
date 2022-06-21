import { movies } from "data/movies";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Movie } from "types/movie";
import { shuffle, slugify } from "utils";
import css from "./Home.module.css";

export const Home: FC = () => {
  const shuffled: Movie[] = shuffle(movies);

  return (
    <div className={css["home-page"]}>
      <div className={css.grid}>
        {shuffled.map((m) => (
          <div key={m.imdbID} className={css["grid-item"]}>
            <NavLink to={`/movies/${slugify(m.title)}`} className={css.wrapper}>
              <img src={m.poster} alt={m.title} />
            </NavLink>
            <div className={css.info}>
              <NavLink to={`/movies/${slugify(m.title)}`} className={css.title}>
                {m.title}
              </NavLink>
              <div className={css.year}>{m.year}</div>
              <div className={css.actors}>{m.director}</div>
              <div className={css.director}>{m.actors}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
