import Icon from './Icon.jsx';
import { asset, EMAIL, LINKEDIN_URL, RESUME_URL } from '../lib/assets.js';

const linkBase = 'inline-flex items-center gap-[10px]';

function ResumeLink({ className = '' }) {
  return (
    <a href={RESUME_URL} className={`${linkBase} font-sans text-[16px] font-medium text-paper underline ${className}`}>
      Download résumé
      <Icon name="arrow-down.svg" />
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer className="flex flex-col gap-7 bg-ink px-5 pb-8 pt-14 text-paper lg:gap-20 lg:px-[120px] lg:pb-14 lg:pt-[120px]">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div className="flex flex-col gap-7 lg:gap-5">
          <h2 className="font-serif text-[52px] font-light leading-none tracking-[-0.02em] lg:text-[clamp(64px,7.8vw,112px)] lg:leading-[0.95] lg:tracking-[-0.03em]">
            Parker Kennedy
          </h2>
          <p className="font-sans text-[16px] leading-[1.5] text-dark-muted lg:text-[19px] lg:leading-normal">
            UX/UI design for calibration software. Seattle, WA.
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10 lg:pt-5">
            <a
              href={`mailto:${EMAIL}`}
              className={`${linkBase} font-serif text-[24px] font-light underline lg:text-[28px]`}
            >
              {EMAIL}
              <Icon name="arrow-external.svg" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className={`${linkBase} font-sans text-[16px] font-medium underline`}
            >
              LinkedIn
              <Icon name="arrow-external.svg" />
            </a>
            {/* On mobile the résumé link lives with the contact links */}
            <ResumeLink className="lg:hidden" />
          </div>
        </div>
        <img
          src={asset('seal.png')}
          alt="Red seal of Parker Kennedy’s Korean name"
          className="order-first size-[88px] object-cover lg:order-last lg:size-[168px]"
        />
      </div>

      <div className="flex items-center justify-between border-t border-dark-rule pt-5 lg:pt-6">
        <p className="font-sans text-[13px] text-dark-muted lg:text-[14px]">© 2026 Parker Kennedy</p>
        <ResumeLink className="hidden lg:inline-flex" />
      </div>
    </footer>
  );
}
