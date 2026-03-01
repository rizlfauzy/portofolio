// zustand
import { create } from "zustand";

export type AlertType = "success" | "error" | "warning" | "info";
type AlertProps = {
  title: string;
  message: string;
  type: AlertType;
  duration: number;
  isCenter: boolean;
} | null;

interface AlertState {
  alert: AlertProps;
  setAlert: (alert: AlertProps) => void;
  clearAlert: () => void;
  showAlert: ({ message, type, title, duration, isCenter }: { message: string; type: AlertType; title: string; duration?: number; isCenter?: boolean }) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alert: null,
  setAlert: (alert) => set({ alert }),
  clearAlert: () => set({ alert: null }),
  showAlert: ({ message, type, title, duration = 5000, isCenter = false }) => {
    set({
      alert: {
        title,
        message,
        type,
        duration,
        isCenter,
      },
    });
  },
}));
