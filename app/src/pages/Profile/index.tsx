import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { getUserProfile } from "store/slices/userSlice";

export const Profile: FC = () => {
  const { username } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (username) {
      const profilePromise = dispatch(getUserProfile(username));
      return () => {
        profilePromise.abort();
      };
    }
  }, [dispatch, username]);

  return (
    <div className="profile-page">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">profile</div>
        </div>
      </div>
    </div>
  );
};
