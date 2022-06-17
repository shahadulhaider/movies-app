import { FC } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectUserToken } from "store/slices/userSlice";
import css from "./Home.module.css";

export const Home: FC = () => {
  const token = useAppSelector(selectUserToken);

  const dispatch = useAppDispatch();

  /* React.useEffect(() => {
   *   const promise = token
   *     ? dispatch(getUserFeedArticles())
   *     : dispatch(getAllArticles())
   *   return () => {
   *     promise.abort()
   *   }
   * }, [dispatch, token]) */

  return <div className={css.home}>home</div>;
};
