/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: boolean) => {
  const [value, setValue] = useState(() => {
    try {
      console.log("inside");
      const localValue = window.localStorage.getItem(key);
      return localValue ? JSON.parse(localValue) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
