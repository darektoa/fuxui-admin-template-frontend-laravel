import { useEffect, useRef } from 'react';

function useFavicon(faviconUrl, prevailOnUnmount = false) {
  const defaultFavicon = useRef(document.querySelector("link[rel*='icon']")?.href);

  useEffect(() => {
    if (faviconUrl) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = faviconUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, [faviconUrl]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      const link = document.querySelector("link[rel*='icon']");
      if (link && defaultFavicon.current) {
        link.href = defaultFavicon.current;
      }
    }
  }, []);
}

export default useFavicon;
