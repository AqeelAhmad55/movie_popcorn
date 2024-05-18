import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const isClient = typeof window !== "undefined";

  const [value, setValue] = useState(() => {
    if (isClient) {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
      } catch (error) {
        console.error("Error parsing localStorage value", error);
        return initialState;
      }
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error setting localStorage value", error);
      }
    }
  }, [value, key, isClient]);

  return [value, setValue];
}
