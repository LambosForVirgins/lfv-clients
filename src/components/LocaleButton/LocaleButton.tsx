import { useLocale } from "@/providers/Locale/LocaleProvider";
import { forwardRef, useState } from "react";

interface LocaleButtonProps
  extends Common.ComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const LocaleButton = forwardRef<HTMLButtonElement, LocaleButtonProps>(
  ({ testID, ...props }, ref) => {
    const [active, setActive] = useState(false);
    const { locale: currentLocale, setLocale } = useLocale();

    const changeLocale = (event: React.ChangeEvent<HTMLInputElement>) =>
      setLocale(event.target.value);

    return (
      <span data-testid={`${testID}.wrapper`} className="relative">
        <button data-testid={testID} ref={ref} {...props}>
          {currentLocale}
        </button>
        <span
          data-testid={`${testID}.options`}
          className="absolute top-[100%] min-w-12 grid p-2 auto-row-auto to bg-black text-white rounded-lg transition-all opacity-0 hover:opacity-100"
        >
          {["en", "jp", "de"].map((locale) => (
            <label key={locale} className="grid grid-cols-2 gap-4">
              <input
                type={"radio"}
                value={locale}
                checked={locale === currentLocale}
                onChange={changeLocale}
                className="hidden"
              />
              {locale}
            </label>
          ))}
        </span>
      </span>
    );
  }
);
