import { ErrorList } from "components/error/errorList";
import { Spinner } from "components/ui/spinner";
import { useLocationState } from "hooks/useLocation";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { loginUser } from "store/slices/userSlice";
import { ResponseStatus } from "types/api";
import { ResError } from "types/error";
import { FromState } from "types/fromState";
import { LoginUser } from "types/user";
import css from "./Login.module.css";

export const Login: FC = () => {
  const [credentials, setCredentials] = useState<LoginUser>({
    email: "",
    password: "",
  });
  const { email, password } = credentials;

  const [status, setStatus] = useState<ResponseStatus>("idle");
  const [error, setError] = useState<ResError | null>(null);
  const canLogin = [email, password].every(Boolean) && status === "idle";

  const locationState = useLocationState<FromState>();
  const from = locationState?.from?.pathname || "/";

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  };

  const onFormSubmitted = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canLogin) return;
    try {
      setError(null);
      setStatus("loading");
      await dispatch(loginUser(credentials)).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      setError(error as ResError);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className={css["auth-page"]}>
      <div className={css["form-container"]}>
        <div className={css.image}>
          <img src="/auth_green.svg" alt="Sign In" />
        </div>
        <div className={css["signin-form"]}>
          <h3>Sign In</h3>
          <p>
            <Link to="/register">Need an account?</Link>
          </p>
          <form onSubmit={(e) => onFormSubmitted(e)}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onInputChanged(e)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onInputChanged(e)}
              required
              minLength={6}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])"
              title="Password should contain 1 uppercase, 1 lowercase and 1 number at least"
            />
            <button disabled={!canLogin}>
              Sign in {status === "loading" && <Spinner />}
            </button>
          </form>
          <ErrorList error={error} />
        </div>
      </div>
    </div>
  );
};
