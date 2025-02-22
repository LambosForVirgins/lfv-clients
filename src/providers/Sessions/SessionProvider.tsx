import { CommandPrompter } from "@/scenes/prompter/CommandPrompter";
import { createContext, useContext, useState } from "react";

interface SessionContextProps {
  showing: boolean;
  loadSession: () => void;
}

interface SessionProviderProps extends Partial<Common.ComponentProps> {}

const SessionContext = createContext<SessionContextProps>({
  showing: true,
  loadSession: () => {
    throw new Error("loadSession function not implemented");
  },
});

export const SessionProvider = ({
  testID = "sessions",
  children,
}: React.PropsWithChildren<SessionProviderProps>) => {
  const [showing, setShowing] = useState(true);

  const loadSession = () => {
    setShowing((prev) => !prev);
  };

  return (
    <SessionContext.Provider value={{ showing, loadSession }}>
      {children}
      {/* <CommandPrompter testID={`${testID}.onboarding`} /> */}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
