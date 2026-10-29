import { useEffect } from 'react';

export const SITE_TITLE = 'Parker Kennedy — UX/UI design for calibration software';

/** Sets the browser tab title for a page; screen readers use it to identify the page. */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Parker Kennedy` : SITE_TITLE;
  }, [title]);
}
