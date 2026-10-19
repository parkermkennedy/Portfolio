import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { CaseStudySection, NextProjectFooter } from '../components/CaseStudy.jsx';
import { CASE_STUDY_CALMAN5 as cs } from '../data.js';
import { asset } from '../lib/assets.js';

export default function CaseStudyCalman5() {
  return (
    <>
      <header className="gutter pb-12 pt-10 lg:pb-[72px] lg:pt-16">
        <Link to="/#work" className="text-link">
          <Icon name="arrow-left.svg" />
          All work
        </Link>

        <h1 className="mt-12 font-serif text-[clamp(48px,8.3vw,120px)] font-light leading-[0.95] tracking-[-0.03em] lg:mt-[72px]">
          {cs.title}
        </h1>
        <p className="mt-4 font-sans text-[18px] text-muted lg:mt-6 lg:text-[20px]">{cs.company}</p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink pt-7 lg:mt-[72px] lg:grid-cols-4 lg:gap-12">
          {cs.meta.map((m) => (
            <div key={m.label} className="flex min-w-px flex-col gap-2">
              <dt className="label">{m.label}</dt>
              <dd className="font-sans text-[16px] leading-[1.4] lg:text-[18px]">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="gutter">
        <div className="flex flex-col items-stretch gap-6 overflow-clip rounded-[4px] bg-plate px-5 py-6 lg:flex-row lg:p-[72px]">
          <figure className="flex min-w-px flex-1 flex-col gap-4">
            <figcaption className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-plate-label">
              Before
            </figcaption>
            <img
              src={asset('cs-before.png')}
              alt="Calman 5 workflow before the makeover"
              className="h-auto w-full object-cover lg:h-[253px]"
            />
          </figure>
          <figure className="flex min-w-px flex-1 flex-col gap-4">
            <figcaption className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-plate-label">
              After
            </figcaption>
            <img
              src={asset('cs-after.png')}
              alt="Calman 5 workflow after the makeover"
              className="h-auto w-full object-cover lg:h-[253px]"
            />
          </figure>
        </div>
      </div>

      <section className="gutter flex flex-col gap-6 pb-14 pt-16 lg:flex-row lg:gap-24 lg:pb-24 lg:pt-[120px]">
        <h2 className="label lg:w-[264px] lg:shrink-0">Summary</h2>
        <p className="min-w-px flex-1 font-serif text-[26px] font-normal leading-[1.3] tracking-[-0.008em] lg:text-[36px]">
          {cs.summary}
        </p>
      </section>

      <div className="gutter pb-16 lg:pb-[120px]">
        {cs.sections.map((section) => (
          <CaseStudySection key={section.title} section={section} />
        ))}
        <hr className="border-rule" />
        <p className="pt-8 font-sans text-[14px] leading-[1.5] text-muted">{cs.disclaimer}</p>
      </div>

      <NextProjectFooter
        label="Next project · password protected"
        title="Next-Gen Calman"
        to="/work/next-gen-calman"
      />
    </>
  );
}
