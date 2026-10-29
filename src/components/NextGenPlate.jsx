import Icon from './Icon.jsx';
import { asset } from '../lib/assets.js';

/**
 * Blurred Next-Gen Calman screenshot with a lock badge, safe to show publicly.
 * The blur is baked into nextgen-preview-blurred.jpg itself: a CSS blur would
 * still ship the sharp file, which anyone could open directly.
 */
export default function NextGenPlate() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-clip rounded-[4px] bg-plate px-5 py-6 lg:p-16">
      <img
        src={asset('nextgen-preview-blurred.jpg')}
        alt=""
        className="h-[235px] w-full max-w-[1012px] object-cover opacity-80 lg:aspect-[1440/1024] lg:h-auto"
      />

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[10px] rounded-[2px] bg-ink/90 px-[14px] py-[10px] text-paper lg:gap-3 lg:px-6 lg:py-4">
        <Icon name="lock.svg" size={14} inset="-4.69% -5.36%" className="lg:hidden" />
        <Icon name="lock.svg" size={18} inset="-3.75% -4.17%" className="hidden lg:inline-block" />
        <span className="whitespace-nowrap font-sans text-[13px] font-medium lg:text-[16px]">
          <span className="lg:hidden">Password protected</span>
          <span className="hidden lg:inline">Unreleased product · password protected</span>
        </span>
      </div>
    </div>
  );
}
