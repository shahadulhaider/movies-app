import { movies } from "data/movies";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { slugify } from "utils";
import css from "./Movie.module.css";

export const Movie: FC = () => {
  const { title } = useParams();
  const movie = movies.find((m) => title === slugify(m.title));

  if (!movie) {
    return <div className={css["movie-page"]}>No movie found</div>;
  }

  return (
    <div className={css["movie-page"]}>
      <div className={css.container}>
        <div className={css.poster}>
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div>
          <div className={css.title}>{movie.title}</div>
          <div className={css.meta}>
            <div className={css.info}>
              <div className={css.name}>Release year</div>
              <div>{movie.year}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>Rating</div>
              <div>{movie.imdbRating}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>Votes</div>
              <div>{movie.imdbVotes}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>Genre</div>
              <div>{movie.genre}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>Runtime</div>
              <div>{movie.runtime}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>IMDB ID</div>
              <div>{movie.imdbID}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>Actors</div>
              <div>{movie.actors}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>Director</div>
              <div>{movie.director}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>Language</div>
              <div>{movie.language}</div>
            </div>
            <div className={css.info}>
              <div className={css.name}>Plot</div>
              <div>{movie.plot}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
