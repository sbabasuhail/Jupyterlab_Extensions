import { useState, useEffect } from 'react';

const useJpTheme = () => {
  const [themeLight, setThemeLight] = useState(
    () => document.body.getAttribute('data-jp-theme-light') === 'true'
  );
  const [themeName, setThemeName] = useState(() =>
    document.body.getAttribute('data-jp-theme-name')
  );
  const [themeScrollbars, setThemeScrollbars] = useState(() =>
    document.body.getAttribute('data-jp-theme-scrollbars')
  );

  useEffect(() => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-jp-theme-light') {
            setThemeLight(
              document.body.getAttribute('data-jp-theme-light') === 'true'
            );
          } else if (mutation.attributeName === 'data-jp-theme-name') {
            setThemeName(document.body.getAttribute('data-jp-theme-name'));
          } else if (mutation.attributeName === 'data-jp-theme-scrollbars') {
            setThemeScrollbars(
              document.body.getAttribute('data-jp-theme-scrollbars')
            );
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true
    });

    return () => observer.disconnect();
  }, []);

  return { themeLight, themeName, themeScrollbars };
};

export default useJpTheme;
