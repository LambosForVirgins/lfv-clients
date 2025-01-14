import React, {
  PropsWithChildren,
  ReactElement,
  useState,
  useEffect,
} from "react";

type ErrorBoundaryProps = PropsWithChildren<{ fallback: ReactElement }>;

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  fallback,
  children,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorListener = (event: ErrorEvent) => {
      setHasError(true);
      console.error("Caught an error:", event.error);
    };

    // Catch unhandled errors
    window.addEventListener("error", errorListener);

    return () => {
      window.removeEventListener("error", errorListener);
    };
  }, []);

  if (hasError) {
    return fallback;
  }

  return <>{children}</>;
};
