import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      typeof window !== "undefined"
        ? localStorage.setItem(key, JSON.stringify(value))
        : null;
    },
    [value, key]
  );
  return [value, setValue];
}
