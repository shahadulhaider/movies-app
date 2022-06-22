import { FullPageSpinner } from "components/ui/spinner/fullPageSpinner";
import { FC, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { getUserProfile } from "store/slices/userSlice";
import { User } from "types/user";
import { capSize, slugify } from "utils";
import css from "./Profile.module.css";

export const Profile: FC = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<User>({} as User);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (username) {
      (async () => {
        try {
          const data = await dispatch(getUserProfile(username)).unwrap();
          setProfile(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [dispatch, username]);

  if (!profile.id) {
    return <FullPageSpinner />;
  }

  return (
    <div className={css["profile-page"]}>
      <div className={css.container}>
        <div className={css.sidebar}>
          <div className={css.wrapper}>
            <img
              src="/cyborg-alien-green.png"
              alt="user avatar"
              className={css.avatar}
            />
          </div>
          <h3>
            Profile <em>of</em> {capSize(profile.username)}
          </h3>
          <div className={css["profile-info"]}>
            <div>
              <span>Email:</span> {profile.email}
            </div>
            <div>
              <span>Joined:</span>
              {new Date(profile.created).toDateString().slice(3)}
            </div>
            <div>
              <span>Favorites:</span> {profile.favorites.length} movies
            </div>
          </div>
        </div>
        <div className={css.list}>
          <div className={css.head}>List of favorite movies</div>
          <>
            {profile.favorites.length === 0 && (
              <div>
                Oups! No movies added to favorites! <a href="/"> Go to home</a>{" "}
                and add what you like!
              </div>
            )}
            <div className={css.favorites}>
              {profile.favorites.map((m) => (
                <div key={m.imdbID} className={css.grid}>
                  <NavLink to={`/movies/${slugify(m.title)}`}>
                    <img src={m.poster} alt={m.title} className={css.poster} />
                  </NavLink>
                  <div>
                    <div className={css.title}>{m.title}</div>
                    <div className={css.director}>{m.director}</div>
                    <div className={css.actors}>{m.actors}</div>
                    <div className={css.meta}>
                      {m.year} | {m.imdbRating} | {m.genre}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};
