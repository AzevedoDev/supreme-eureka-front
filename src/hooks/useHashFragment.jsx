import { useEffect } from 'react';

export function useHashFragment(offset = 0, trigger = true) {
  useEffect(() => {
    setTimeout(() => {
      {
        const scrollToHashElement = () => {
          const { hash } = window.location;
          const elementToScroll = document.getElementById(hash?.replace('#', ''));

          if (!elementToScroll) return;

          window.scrollTo({
            top: elementToScroll.offsetTop - offset,
            behavior: 'smooth',
          });
        };

        if (!trigger) return;

        scrollToHashElement();
        window.addEventListener('hashchange', scrollToHashElement);
        return window.removeEventListener('hashchange', scrollToHashElement);
      }
    }, 1000);
  }, [trigger]);
}
