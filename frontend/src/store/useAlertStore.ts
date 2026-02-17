// zustand
import { create } from "zustand";

export type AlertType = "success" | "error" | "warning" | "info";
type AlertProps = {
  title: string;
  message: string;
  type: AlertType;
  duration: number;
  isCenter: boolean;
};

interface AlertState {
  alert: AlertProps | null;
  setAlert: (alert: AlertProps) => void;
  clearAlert: () => void;
  showAlert: ({ message, type, title }: { message: string; type: AlertType; title: string }) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alert: null,
  setAlert: (alert) => set({ alert }),
  clearAlert: () => set({ alert: null }),
  showAlert: ({ message, type, title }) => {
    set({
      alert: {
        title,
        message,
        type,
        duration: 5000,
        isCenter: false,
      },
    });
  },
}));
