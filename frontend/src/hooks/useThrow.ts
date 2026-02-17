// store
import { useAlertStore } from "@/store/useAlertStore";

// react
import { useCallback } from "react";

export default function useThrow() {
  const { showAlert } = useAlertStore();

  const throwAlert = useCallback(
    (name: string, message: string) => {
      switch (name) {
        case "Warning":
          showAlert({ message, type: "warning", title: "Warning" });
          break;
        case "NetworkError":
          showAlert({ message, type: "error", title: "Network Error" });
          break;
        default:
          showAlert({ message, type: "error", title: "Error" });
          break;
      }
    },
    [showAlert],
  );
  return { throwAlert };
}
