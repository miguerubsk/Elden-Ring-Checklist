import { useEffect, useState } from "react";

const isServer = typeof window === "undefined";

export const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => defaultValue);

  // taken from https://stackoverflow.com/a/75862054
  const initialize = () => {
    if (isServer) {
      return defaultValue;
    }
    try {
      const value = localStorage.getItem(keyName);

      if (value) {
        const storageValue = JSON.parse(value);

        // use this to make sure our lists have not updated the amount of requirements
        if (
          typeof defaultValue === "object" &&
          typeof storageValue === "object"
        ) {
          if (
            Object.keys(defaultValue).length ===
            Object.keys(storageValue).length
          ) {
            return storageValue;
          } else if (Object.keys(defaultValue) > Object.keys(storageValue)) {
            // if objects have a property with the same name, then the right-most object property overwrites the previous one.
            const combinedWithNewEntries = { ...defaultValue, ...storageValue };
            localStorage.setItem(
              keyName,
              JSON.stringify(combinedWithNewEntries)
            );

            return combinedWithNewEntries;
          } else if (Object.keys(defaultValue) < Object.keys(storageValue)) {
            // move the values of the storageValue into the defaultValue.
            // so we keep the correct amount of keys and the previously saved values.
            Object.keys(storageValue).forEach(function (key) {
              if (key in defaultValue) {
                defaultValue[key] = storageValue[key];
              }
            });
            localStorage.setItem(keyName, JSON.stringify(defaultValue));

            return defaultValue;
          }
        } else {
          return storageValue;
        }
      }

      localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  };

  /* prevents hydration error so that state is only initialized after server is defined */
  useEffect(() => {
    if (!isServer) {
      setStoredValue(initialize());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = (newValue: any) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};
