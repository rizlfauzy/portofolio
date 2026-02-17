// react
import { useCallback } from "react";

// hooks
import useAsync from "@/hooks/useAsync";
import useFetch from "@/hooks/useFetch";
import useThrow from "@/hooks/useThrow";

// store
import { useLoadingStore } from "@/store/useLoadingStore";

export default function useHomeService() {
  const { getData } = useFetch();
  const { run } = useAsync();
  const { setLoading } = useLoadingStore();
  const { throwAlert } = useThrow();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { error, message, data } = await run(getData({ url: "/cv" }));

      if (error) throw new Error(message);
      return data;
    } catch (e: unknown) {
      if (e instanceof Error) throwAlert(e.name, e.message);
    } finally {
      setLoading(false);
    }
  }, [getData, run, setLoading, throwAlert]);

  return {
    getProfile,
  };
}
