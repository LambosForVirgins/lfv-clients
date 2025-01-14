import { AtomEffect } from "recoil";

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null && savedValue !== "undefined") {
      setSelf(
        savedValue === "undefined" ? setSelf(null as T) : JSON.parse(savedValue)
      );
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(
            key,
            JSON.stringify(newValue === undefined ? null : newValue)
          );
    });
  };
