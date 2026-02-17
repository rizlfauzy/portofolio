import { useRef, useLayoutEffect, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useSafeDispatch<T extends (...args: any[]) => void>(dispatch: T): T {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback((...args: Parameters<T>) => (mounted.current ? dispatch(...args) : void 0), [dispatch]) as T;
}
