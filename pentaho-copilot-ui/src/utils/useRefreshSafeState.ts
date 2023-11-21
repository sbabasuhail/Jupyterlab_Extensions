import { useState, useEffect, useReducer } from "react";

export function useRefreshSafeState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Use lazy initialization for the state.
  const [state, setState] = useState<T>(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const savedState = sessionStorage.getItem(key);
      return savedState !== null && savedState !== "undefined"
        ? JSON.parse(savedState)
        : defaultValue;
    }
    return defaultValue;
  });

  // Effect hook to persist the state only when the page is about to be unloaded.
  useEffect(() => {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return;
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem(key, JSON.stringify(state));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted.
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state, key]);

  return [state, setState];
}

export function useRefreshSafeReducer<T, A>(
  key: string,
  reducer: (state: T, action: A) => T,
  initialState: T
): [T, React.Dispatch<A>] {
  // Lazy initialization for the state based on sessionStorage
  const [state, dispatch] = useReducer(reducer, initialState, (initial: T) => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const savedState = sessionStorage.getItem(key);
      return savedState !== null && savedState !== "undefined"
        ? JSON.parse(savedState)
        : initial;
    }
    return initial;
  });

  // Effect hook to persist the state only when the page is about to be unloaded.
  useEffect(() => {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return;
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem(key, JSON.stringify(state));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component is unmounted.
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state, key]);

  return [state, dispatch];
}
