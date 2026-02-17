import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const useAdvancedTypewriter = (texts: string[] = ["Loading..."], speed: number = 100, deleteSpeed: number = 50, delayBetweenTexts: number = 2000, loop: boolean = true) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), delayBetweenTexts);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          if (loop) {
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      }
    };

    const currentSpeed = isDeleting ? deleteSpeed : speed;
    const timer = setTimeout(handleType, currentSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, delayBetweenTexts, loop]);

  return displayText;
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = "default", className = "", ...props }: { size?: string; className?: string; props?: React.HTMLAttributes<HTMLDivElement> }) => {
  const sizeClasses: Record<string, string> = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return <div className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-blue-600", sizeClasses[size], className)} {...props} />;
};

// Full Screen Loading with Multiple Messages
export const FullScreenLoading = ({
  message = "Loading...",
  messages = null,
  typewriterSpeed = 100,
  deleteSpeed = 50,
  typewriterDelay = 2000,
  showCursor = true,
}: {
  message?: string;
  messages?: string[] | null;
  typewriterSpeed?: number;
  deleteSpeed?: number;
  typewriterDelay?: number;
  showCursor?: boolean;
}) => {
  // Use multiple messages if provided, otherwise single message
  const textsToShow = messages || [message];
  const animatedMessage = useAdvancedTypewriter(textsToShow, typewriterSpeed, deleteSpeed, typewriterDelay);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-colors">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <div className="h-6 flex items-center min-w-50 justify-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {animatedMessage}
            {showCursor && <span className="animate-pulse text-blue-600 font-bold ml-1">|</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

// Card Loading Skeleton
export const CardLoadingSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-62.5" />
          <Skeleton className="h-4 w-50" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

// Table Loading Skeleton
export const TableLoadingSkeleton = ({ rows = 5 }) => {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="border-b bg-gray-50 p-4">
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-25" />
            <Skeleton className="h-4 w-37.5" />
            <Skeleton className="h-4 w-30" />
            <Skeleton className="h-4 w-5" />
          </div>
        </div>
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="border-b p-4 last:border-b-0">
            <div className="flex space-x-4">
              <Skeleton className="h-4 w-25" />
              <Skeleton className="h-4 w-37.5" />
              <Skeleton className="h-4 w-30" />
              <Skeleton className="h-4 w-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// List Loading Skeleton
export const ListLoadingSkeleton = ({ items = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 rounded-lg border p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-50" />
            <Skeleton className="h-3 w-37.5" />
          </div>
          <div className="ml-auto">
            <Skeleton className="h-8 w-5" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Button Loading State
export const ButtonLoading = ({ children, loading = false, ...props }: { children: React.ReactNode; loading: boolean; props: React.HTMLAttributes<HTMLButtonElement> }) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
};

// Content Loading with Pulse Animation
export const ContentLoading = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Loading Dots Animation
export const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
    </div>
  );
};

// Loading Progress Bar
export const LoadingProgress = ({ progress = 0, className }: { progress?: number; className?: string }) => {
  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2", className)}>
      <div className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
    </div>
  );
};

// Default Export - Simple Loading Component
interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
  fullScreen?: boolean;
  message?: string;
}

const Loading = ({ type = "spinner", fullScreen = false, message = "Loading...", ...props }: LoadingProps) => {
  if (fullScreen) {
    return <FullScreenLoading message={message} {...props} />;
  }

  switch (type) {
    case "skeleton":
      return <CardLoadingSkeleton />;
    case "dots":
      return (
        <div className="flex flex-col items-center space-y-2">
          <LoadingDots />
          <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
        </div>
      );
    case "spinner":
    default:
      return (
        <div className="flex flex-col items-center space-y-2">
          <LoadingSpinner {...props} />
          <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
        </div>
      );
  }
};

export default Loading;
