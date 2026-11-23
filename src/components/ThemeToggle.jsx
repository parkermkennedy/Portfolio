import Icon from './Icon.jsx';
import { useTheme } from '../lib/theme.js';

/** Icon button that switches between the light and dark themes. */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex size-11 items-center justify-center text-ink ${className}`}
    >
      {/* Shows the theme you'd switch to */}
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  );
}
