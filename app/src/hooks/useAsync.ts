import { AxiosResponse } from "axios";
import { useCallback, useReducer } from "react";
import { ResponseStatus } from "types/api";
import { ResError } from "types/error";
import { getErrorData } from "utils";

type InitialState<D> = {
  data?: D | null;
  status?: ResponseStatus;
  error?: ResError | null;
};

type DefaultState<D> = {
  data: D | null;
  status: ResponseStatus;
  error: ResError | null;
};

function useAsync<T>(initialState?: InitialState<T>) {
  const [state, dispatch] = useReducer(
    (s: typeof initialState, a: DefaultState<T>) => ({ ...s, ...a }),
    {
      data: null,
      status: "idle",
      error: null,
      ...initialState,
    } as DefaultState<T>
  );

  const { data, error, status } = state;

  const setData = useCallback(
    (data: T) => dispatch({ data, status: "success", error: null }),
    [dispatch]
  );
  const setError = useCallback(
    (error: ResError | null) =>
      dispatch({ data: null, status: "failed", error }),
    [dispatch]
  );

  const run = useCallback(
    (promise: Promise<AxiosResponse<T, any>>) => {
      dispatch({ data: null, status: "loading", error: null });

      return promise.then(
        (response: AxiosResponse<T, any>) => {
          setData(response.data);
          return response.data;
        },
        (error: ResError | null) => {
          setError(getErrorData(error));
          return Promise.reject(error);
        }
      );
    },
    [dispatch, setData, setError]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "loading",
    isError: status === "failed",
    isSuccess: status === "success",

    error,
    status,
    data,
    run,
  };
}

export { useAsync };
