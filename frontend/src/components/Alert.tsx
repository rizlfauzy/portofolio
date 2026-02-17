// react
import { memo, useCallback, useEffect, useRef, useState } from "react";

// icons
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

// store
import { useAlertStore } from "@/store/useAlertStore";
import { type AlertType } from "@/store/useAlertStore";

// utils
import { cn } from "@/lib/utils";

export default memo(function Alert() {
  const { alert, clearAlert } = useAlertStore();

  // states
  const [progress, setProgress] = useState<number>(100);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // ref
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle keyboard events untuk accessibility
  useEffect(() => {
    if (!alert) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Close alert dengan ESC key
      if (event.key === "Escape") clearAlert();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  // Reset progress saat alert berubah
  useEffect(() => {
    if (alert && alert.duration > 0) setProgress(100);
  }, [alert]);

  // Handle progress bar countdown
  useEffect(() => {
    if (!alert || alert.duration <= 0) return;

    const decrement = 100 / (alert.duration / 100);

    const interval = setInterval(() => {
      if (isHovered) return;
      setProgress((prev) => Math.max(prev - decrement, 0));
    }, 100);

    return () => clearInterval(interval);
  }, [alert, isHovered]);

  useEffect(() => {
    if (!alert || alert.duration <= 0) return;
    if (progress <= 0) clearAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const getAlertIcon = useCallback(({ type, isCenter = true }: { type: AlertType; isCenter?: boolean }) => {
    switch (type) {
      case "success":
        return <CheckCircle className={`${isCenter ? "h-20 w-20" : "h-6 w-6"} text-green-600!`} />;
      case "error":
        return <AlertCircle className={`${isCenter ? "h-20 w-20" : "h-6 w-6"} text-red-600!`} />;
      case "warning":
        return <AlertTriangle className={`${isCenter ? "h-20 w-20" : "h-6 w-6"} text-yellow-600!`} />;
      case "info":
        return <Info size={20} />;
    }
  }, []);

  const getAlertStyles = useCallback(({ type }: { type: AlertType }) => {
    switch (type) {
      case "success":
        return "border-green-400 bg-green-50 text-green-600";
      case "warning":
        return "border-yellow-400 bg-yellow-50 text-yellow-600";
      case "info":
        return "border-blue-400 bg-blue-50 text-blue-600";
      case "error":
        return "border-red-400 bg-red-50 text-red-600";
      default:
        return "";
    }
  }, []);

  return !alert ? null : alert.isCenter ? (
    <div
      className="alert-wrapper fixed z-51 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] grid place-items-center"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        const target = document.querySelector(".alert-wrapper");
        if (e.target === target) clearAlert();
      }}
    >
      <div
        className={cn("relative rounded-lg border px-4 py-3 text-sm bg-background text-foreground shadow-lg md:w-72 w-60", getAlertStyles({ type: alert.type }))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid place-items-center text-center">
          <div className="mt-1 mb-4">{getAlertIcon({ type: alert.type })}</div>
          <div className="mb-2">
            <div className="mb-1 leading-none tracking-tight font-bold text-lg text-slate-600">{alert.title}</div>
            <div className="text-sm [&_p]:leading-relaxed text-slate-600">{alert.message}</div>
          </div>
          <div className="absolute right-2 top-2">
            <button ref={closeButtonRef} type="button" className="bg-red-600 hover:bg-red-700! active:bg-red-600! text-white p-3 cursor-pointer" aria-label="Close alert" title="Close alert (ESC)">
              <X className="h-5 w-5" />
            </button>
          </div>
          {alert.duration > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2.5">
              <div
                className={cn("h-2.5 rounded-full transition-all duration-100 ease-linear", alert.type === "success" ? "bg-green-600" : alert.type === "error" ? "bg-red-600" : alert.type === "warning" ? "bg-yellow-600" : "bg-blue-600")}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="fixed top-5 right-5 transform z-51 w-full max-w-md px-4" role="alert" aria-live="assertive" aria-atomic="true">
      <div
        className={cn("relative rounded-lg border px-4 py-3 text-sm bg-background text-foreground shadow-lg border-l-4", getAlertStyles({ type: alert.type }))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          <div className="mt-1 mr-4">{getAlertIcon({ type: alert.type, isCenter: false })}</div>
          <div className="flex-1">
            <div className="mb-1 leading-none tracking-tight font-bold text-lg text-slate-600">{alert.title}</div>
            <div className="text-sm [&_p]:leading-relaxed text-slate-600">{alert.message}</div>
          </div>
          <div className="ml-4">
            <button
              ref={closeButtonRef}
              type="button"
              className="bg-red-600 hover:bg-red-700! active:bg-red-600! text-white p-3 rounded-lg cursor-pointer"
              aria-label="Close alert"
              title="Close alert (ESC)"
              onClick={() => {
                clearAlert();
                // buat tombolnya unfocus biar gak fokus terus
                closeButtonRef?.current?.blur();
                setIsHovered(false);
              }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        {alert.duration > 0 && (
          <div className="absolute bottom-0 left-0 w-[99%] h-1 bg-gray-200 rounded-md">
            <div
              className={cn("h-1 rounded-full transition-all duration-100 ease-linear", alert.type === "success" ? "bg-green-600" : alert.type === "error" ? "bg-red-600" : alert.type === "warning" ? "bg-yellow-600" : "bg-blue-600")}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
});
