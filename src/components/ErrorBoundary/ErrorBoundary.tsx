import React, {
  PropsWithChildren,
  ReactElement,
  useState,
  useEffect,
} from "react";
import styles from "./ErrorBoundary.module.css";
import { isRouteErrorResponse } from "react-router";

type ErrorBoundaryProps = PropsWithChildren<{ fallback?: ReactElement | null }>;

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  fallback,
  children,
}) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorListener = (event: ErrorEvent) => {
      setError(event.error);
      console.error("Caught an error:", event.error);
    };

    // Catch unhandled errors
    window.addEventListener("error", errorListener);

    return () => {
      window.removeEventListener("error", errorListener);
    };
  }, []);

  if (error) {
    return fallback ?? <ErrorScene error={error} />;
  }

  return children;
};

const ErrorScene = ({ error }: { error: any }) => {
  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.frame}>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className={styles.frame}>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
};
