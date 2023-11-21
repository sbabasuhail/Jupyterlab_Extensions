import { createContext } from "react";
import createCache from "@emotion/cache";
const HvThemeContext = createContext({
  themes: [],
  activeTheme: void 0,
  colorModes: [],
  selectedTheme: "",
  selectedMode: "",
  changeTheme: () => {
  },
  rootId: void 0
});
const defaultCacheKey = "hv";
const defaultEmotionCache = createCache({
  key: defaultCacheKey,
  prepend: true
});
const EmotionContext = createContext({
  cache: defaultEmotionCache
});
export {
  EmotionContext,
  HvThemeContext,
  defaultCacheKey,
  defaultEmotionCache
};
//# sourceMappingURL=uikit-react-shared.esm.js.map
