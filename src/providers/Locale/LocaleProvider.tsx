import { createContext, useContext, useEffect, useState } from "react";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

interface LocalContextProps {
  locale: string;
  setLocale: (locale: string) => void;
}

interface LocaleProviderProps {
  children: React.ReactNode;
  initialLocale: string;
}

const LocaleContext = createContext<LocalContextProps | undefined>(undefined);

export const LocaleProvider = ({
  children,
  initialLocale,
}: LocaleProviderProps) => {
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    console.log("Locale set", locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
