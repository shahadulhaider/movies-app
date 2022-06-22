import { movies } from "data/movies";
import { FC, useEffect, useState, MouseEvent } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MovieApi } from "service/movie";
import { useAppDispatch } from "store/hooks";
import { getCurrentUser } from "store/slices/userSlice";
import { UserRes } from "types/user";
import { slugify } from "utils";
import css from "./Movie.module.css";

export const Movie: FC = () => {
  const { title } = useParams();
  const movieInData = movies.find((m) => title === slugify(m.title))!;
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("jwt");
  let canLike;

  const [user, setUser] = useState<UserRes>({} as UserRes);
  const [movie, setMovie] = useState(movieInData);
  const [movieInDB, setMovieInDb] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const current = await dispatch(getCurrentUser(token!)).unwrap();
        setUser(current);
        setShowButton(!!current.user);

        const { data } = await MovieApi.findMovie(movie.title);
        if (data) {
          setMovieInDb(data.title);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token, dispatch, movie]);

  if (user.user && user.user.favorites) {
    canLike = !user.user.favorites.some((m) => m.title === movie.title);
  }

  const handleAddFavorite = async (e: MouseEvent<Element>) => {
    e.stopPropagation();
    if (!movieInDB) {
      // NOTE: movie not in db, so first insert and then add this to favorite
      const res = await MovieApi.createMovie(movie);
      setMovie(res.data);
    } else {
      // NOTE: just add to favorite
      const res = await MovieApi.addFavorite(movie.title);
      setMovie(res.data);
    }
  };

  const handleRemoveFavorite = async (e: MouseEvent<Element>) => {
    e.stopPropagation();
    const res = await MovieApi.removeFavorite(movie.title);
    setMovie(res.data);
  };

  if (!movie) {
    return <div className={css["movie-page"]}>No movie found</div>;
  }
  console.log({ canLike });

  return (
    <div className={css["movie-page"]}>
      <div className={css.container}>
        <div className={css.poster}>
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div>
          <div className={css.title}>{movie.title}</div>
          <div className={css.like}>
            {showButton &&
              (canLike ? (
                <button onClick={(e) => handleAddFavorite(e)}>
                  Add to Favorites{" "}
                  <span>
                    <FaHeart />
                  </span>{" "}
                </button>
              ) : (
                <button onClick={(e) => handleRemoveFavorite(e)}>
                  Remove from Favorites
                </button>
              ))}
          </div>
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
