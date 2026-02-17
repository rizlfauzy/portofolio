import { useCallback, useReducer, useRef } from "react";
import useSafeDispatch from "@/hooks/useSafeDispatch";

interface AsyncState<D, E = unknown> {
  data: D | null;
  status: "idle" | "pending" | "resolved" | "rejected";
  error: E | null;
}

const defaultState: AsyncState<null, null> = {
  data: null,
  status: "idle",
  error: null,
};

export default function useAsync<D, E = unknown>(initialState?: Partial<AsyncState<D, E>>) {
  const initialAsyncState = {
    ...defaultState,
    ...initialState,
  };
  const initialStateRef = useRef(initialAsyncState);

  const [{ data, status, error }, setState] = useReducer((s: AsyncState<D, E>, a: Partial<AsyncState<D, E>>) => ({ ...s, ...a }), initialAsyncState);

  const safeSetState = useSafeDispatch(setState);

  const run = useCallback(
    (promise: Promise<D>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!promise || !(promise as any).then) throw new Error("useAsync.run must receive a promise");
      safeSetState({ status: "pending" });
      return promise.then(
        (data: D) => {
          safeSetState({ status: "resolved", data });
          return data;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error: any) => {
          // As per original source code logic
          const parsedError = JSON.parse(error.message);
          safeSetState({ status: "rejected", error: parsedError });
          return error;
        },
      );
    },
    [safeSetState],
  );

  const setData = useCallback((data: D) => safeSetState({ data }), [safeSetState]);
  const setError = useCallback((error: E) => safeSetState({ error }), [safeSetState]);
  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

  return {
    data,
    status,
    error,
    run,
    setData,
    setError,
    reset,
    isIdle: status === "idle",
    isLoading: status === "idle" || status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",
  };
}
