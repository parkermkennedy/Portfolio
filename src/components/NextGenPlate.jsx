import Icon from './Icon.jsx';
import { asset } from '../lib/assets.js';

/** Blurred Next-Gen Calman screenshot with a lock badge, safe to show publicly. */
export default function NextGenPlate() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-clip rounded-[4px] bg-plate px-5 py-6 lg:p-16">
      {/* Mobile: blurred, dimmed screenshot */}
      <img
        src={asset('nextgen-mobile.png')}
        alt=""
        className="h-[235px] w-full object-cover opacity-60 blur-[10px] lg:hidden"
      />
      {/* Desktop: blurred screenshot cropped to the plate */}
      <div className="relative hidden aspect-[1012/720] w-full max-w-[1012px] overflow-hidden blur-[2px] lg:block">
        <img
          src={asset('nextgen-desktop.png')}
          alt=""
          className="pointer-events-none absolute left-[-8.91%] top-[-9.54%] h-[147.57%] w-[147.64%] max-w-none"
        />
      </div>

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
