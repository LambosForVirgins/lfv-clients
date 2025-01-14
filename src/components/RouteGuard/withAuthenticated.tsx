import React from "react";
import { Navigate, RouteProps } from "react-router";
import { useAuthentication } from "@/hooks/useAuthentication";

interface WithAuthenticationOptions {
  redirectTo?: string;
}

export const withAuthenticated = <P extends object>(
  Component: React.FC<P>,
  options?: WithAuthenticationOptions
) => {
  const { redirectTo = "/" } = options || {};

  return (props: P & RouteProps) => {
    const { authenticated } = useAuthentication();

    if (!authenticated) {
      return <Navigate to={redirectTo} replace />;
    }

    return <Component {...props} />;
  };
};
