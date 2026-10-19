import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { CASE_STUDY_CALMAN5 as cs } from '../data.js';
import { asset, EMAIL, LINKEDIN_URL, RESUME_URL } from '../lib/assets.js';

const sectionTitle =
  'font-serif text-[28px] font-normal leading-[1.15] tracking-[-0.008em] lg:w-[264px] lg:shrink-0 lg:text-[34px]';
const bodyText = 'font-sans text-[16px] leading-[1.6] lg:text-[18px]';

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p className={bodyText}>{block.text}</p>;
    case 'h':
      return <h3 className="font-sans text-[16px] font-medium leading-[1.4] lg:text-[18px]">{block.text}</h3>;
    case 'pull':
      return (
        <p className="font-serif text-[24px] font-light italic leading-[1.3] tracking-[-0.005em] lg:text-[30px]">
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-4">
              <span className="flex pt-3" aria-hidden="true">
                <span className="size-[6px] shrink-0 bg-accent" />
              </span>
              <span className={`min-w-px flex-1 ${bodyText}`}>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'pair':
      return (
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {block.items.map((item) => (
            <div key={item.heading} className="flex min-w-px flex-1 flex-col gap-[10px] border-t border-ink pt-5">
              <h3 className="font-sans text-[18px] font-medium">{item.heading}</h3>
              <p className="font-sans text-[16px] leading-[1.55] text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function Section({ section }) {
  return (
    <section className="flex flex-col gap-6 border-t border-rule pb-14 pt-10 lg:flex-row lg:gap-24 lg:pb-[72px] lg:pt-14">
      <h2 className={sectionTitle}>{section.title}</h2>
      <div className="flex flex-col gap-6 lg:w-[760px]">
        {section.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </section>
  );
}

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
          <Section key={section.title} section={section} />
        ))}
        <hr className="border-rule" />
        <p className="pt-8 font-sans text-[14px] leading-[1.5] text-muted">{cs.disclaimer}</p>
      </div>

      <footer className="flex flex-col gap-6 bg-ink px-5 pb-8 pt-14 text-paper lg:px-[120px] lg:pb-14 lg:pt-24">
        <p className="label !text-dark-muted">Next project · password protected</p>
        <div
          className="flex cursor-not-allowed items-center justify-between gap-6"
          aria-disabled="true"
          title="This case study isn’t available yet"
        >
          <span className="font-serif text-[clamp(40px,6.1vw,88px)] font-light leading-none tracking-[-0.025em]">
            Next-Gen Calman
          </span>
          <Icon name="arrow-right.svg" size={56} inset="-1.34%" className="hidden lg:inline-block" />
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-dark-rule pt-6 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-sans text-[14px] text-dark-muted">© 2026 Parker Kennedy · Seattle, WA</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-[10px] font-sans text-[16px] font-medium underline">
              {EMAIL}
              <Icon name="arrow-external.svg" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-[10px] font-sans text-[16px] font-medium underline"
            >
              LinkedIn
              <Icon name="arrow-external.svg" />
            </a>
            <a href={RESUME_URL} className="inline-flex items-center gap-[10px] font-sans text-[16px] font-medium underline">
              Download résumé
              <Icon name="arrow-down.svg" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
