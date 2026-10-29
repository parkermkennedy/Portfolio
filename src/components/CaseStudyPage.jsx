import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { CaseStudySection, NextProjectFooter, TlDr } from './CaseStudy.jsx';
import { PageSlot } from './Layout.jsx';
import useDocumentTitle from '../lib/useDocumentTitle.js';

function Shot({ caption, src, alt, imgClassName }) {
  return (
    <figure className="flex min-w-px flex-1 flex-col gap-4">
      <figcaption className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-plate-label">
        {caption}
      </figcaption>
      <img src={src} alt={alt} className={`h-auto w-full object-cover ${imgClassName}`} />
    </figure>
  );
}

/**
 * A public case study: header with meta and TL;DR, a Before / After plate,
 * the summary, the sections, and a footer linking to the next project.
 * `before` and `after` are { src, alt }; `next` is { label, title, to }.
 */
export default function CaseStudyPage({ cs, before, after, imgClassName = 'lg:h-[253px]', next }) {
  useDocumentTitle(cs.title);
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

        <TlDr items={cs.tldr} />
      </header>

      <div className="gutter">
        <div className="flex flex-col items-stretch gap-6 overflow-clip rounded-[4px] bg-plate px-5 py-6 lg:flex-row lg:p-[72px]">
          <Shot caption="Before" {...before} imgClassName={imgClassName} />
          <Shot caption="After" {...after} imgClassName={imgClassName} />
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
        {cs.disclaimer && (
          <>
            <hr className="border-rule" />
            <p className="pt-8 font-sans text-[14px] leading-[1.5] text-muted">{cs.disclaimer}</p>
          </>
        )}
      </div>

      <PageSlot name="footer">
        <NextProjectFooter {...next} />
      </PageSlot>
    </>
  );
}
