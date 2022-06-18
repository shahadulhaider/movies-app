import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { getUserProfile } from "store/slices/userSlice";
import css from "./Profile.module.css";

export const Profile: FC = () => {
  const { username } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (username) {
      (async () => {
        try {
          const data = await dispatch(getUserProfile(username)).unwrap();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [dispatch, username]);

  return (
    <div className={css["profile-page"]}>
      <div className={css.container}>
        <div className="col-xs-12 col-md-10 offset-md-1">profile</div>
      </div>
    </div>
  );
};
