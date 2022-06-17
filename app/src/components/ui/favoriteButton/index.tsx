import { FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { ResponseStatus } from "types/api";
import { ResError } from "types/error";
import { Movie } from "types/movie";
import { Button } from "../button";
import { Spinner } from "../spinner";

interface FavoriteButtonProps {
  movie: Movie;
  className?: string;
  [x: string]: any;
  children: ReactNode;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  movie,
  className = "",
  children,
  ...props
}) => {
  const [status, setStatus] = useState<ResponseStatus>("idle");
  const [error, setError] = useState<ResError | null>(null);
  const isFavorited = movie.actors || false;
  const canFavorite = status === "idle";

  /* const { auth, from } = useAuthRequire(); */

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFavoriteClicked = async () => {
    /* if (!auth) {
     *   navigate("/login", { state: from, replace: true });
     *   return;
     * } */
    if (!canFavorite) return;

    try {
      setError(null);
      setStatus("loading");
      /* isFavorited
       *   ? await dispatch(unfavoriteMovie(movie.slug)).unwrap()
       *   : await dispatch(favoriteMovie(movie.slug)).unwrap(); */
      setStatus("success");
    } catch (error) {
      setError(error as ResError);
    } finally {
      setStatus("idle");
    }
  };

  const favoriteBtn = (
    <Button
      className={`btn-primary ${className}`}
      icon="ion-heart"
      disabled={!canFavorite}
      {...props}
      onClick={onFavoriteClicked}
    >
      {children}
      {/* {status === "loading" && <Spinner />} */}
    </Button>
  );
  const unFavoriteBtn = (
    <Button
      className={`btn-outline-primary ${className}`}
      icon="ion-heart"
      disabled={!canFavorite}
      {...props}
      onClick={onFavoriteClicked}
    >
      {children} {status === "loading" && <Spinner />}
    </Button>
  );
  return (
    <>
      {isFavorited ? favoriteBtn : unFavoriteBtn}
      {/* <ErrorList error={error} /> */}
    </>
  );
};
