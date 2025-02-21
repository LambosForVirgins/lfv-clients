import { useEffect } from "react";

import { localStorageEffect } from "../effects/localStorageEffect";
import { atom, useRecoilState } from "recoil";

const STORAGE_KEY = "dev-toggles";

const initialKeys = {
  events: false,
  merchandise: false,
  giveaways: false,
  giveaway_info: false,
  giveaways_history: false,
  tickets: false,
  partners: false,
  footer: false,
  disclaimers: false,
  market_cap: false,
  self_exclude: false,
  balance_details: false,
  daily_giveaways: false,
  onboardingv2: false,
};

const toBoolean = (value: string | null, defaultValue: boolean): boolean => {
  if (value === "true" || value === "1" || value == "") return true;
  if (value === "false" || value === "0") return false;
  return defaultValue;
};

type DevToggles = typeof initialKeys;

const togglesAtom = atom<DevToggles>({
  key: STORAGE_KEY,
  default: initialKeys,
  effects: [localStorageEffect(STORAGE_KEY)],
});

/**
 * To change the url:
 *
 * *Disabled*
 * - `URL?stepped-explore=0`
 * - `URL?stepped-explore=false`
 *
 * *Enabled*
 * - `URL?stepped-explore`
 * - `URL?stepped-explore=1`
 * - `URL?stepped-explore=true`
 *
 * To use in code:
 *
 * @example {isEnabled('stepped-explore') && <XXX />}
 */
export const useDevToggles = () => {
  const [toggles, setToggles] = useRecoilState(togglesAtom);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    setToggles((currentState) =>
      Object.entries(initialKeys).reduce(
        (merged, [availableKey, defaultValue]) => {
          if (queryParams.has(availableKey)) {
            // @ts-ignore fuck your types
            merged[availableKey] = toBoolean(
              queryParams.get(availableKey),
              defaultValue
            );
          }

          return merged;
        },
        { ...currentState }
      )
    );
  }, [window.location.search]);

  const allEnabled = (...keys: (keyof DevToggles)[]): boolean => {
    return keys.every((key) => toggles[key]);
  };

  const someEnabled = (...keys: (keyof DevToggles)[]): boolean => {
    return keys.some((key) => toggles[key]);
  };

  const isEnabled = (key: keyof DevToggles): boolean => {
    return toggles[key];
  };

  return { isEnabled, someEnabled, allEnabled };
};
