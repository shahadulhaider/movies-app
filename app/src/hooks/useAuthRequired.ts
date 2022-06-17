import { useLocation } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { selectUserToken } from "store/slices/userSlice";
import { FromState } from "types/fromState";

export const useAuthRequired = () => {
  const auth = useAppSelector(selectUserToken);
  const location = useLocation();
  const from: FromState = { from: location };

  return {
    auth,
    from,
  };
};
