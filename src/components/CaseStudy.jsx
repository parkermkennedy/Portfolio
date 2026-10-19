import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { EMAIL, LINKEDIN_URL, RESUME_URL, RESUME_FILENAME } from '../lib/assets.js';

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
      // Items are plain strings, or { lead, text } for a bold lead-in.
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => {
            const key = typeof item === 'string' ? item : item.lead;
            return (
              <li key={key} className="flex items-start gap-4">
                <span className="flex pt-3" aria-hidden="true">
                  <span className="size-[6px] shrink-0 bg-accent" />
                </span>
                <span className={`min-w-px flex-1 ${bodyText}`}>
                  {typeof item === 'string' ? (
                    item
                  ) : (
                    <>
                      <span className="font-medium">{item.lead}</span> {item.text}
                    </>
                  )}
                </span>
              </li>
            );
          })}
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
    case 'image':
      return (
        <img
          src={block.src}
          alt={block.alt}
          className="h-auto w-full rounded-[4px] object-cover lg:h-[575px]"
        />
      );
    default:
      return null;
  }
}

export function CaseStudySection({ section }) {
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

/** Dark footer at the end of a case study, linking to the next project. */
export function NextProjectFooter({ label, title, to }) {
  return (
    <footer className="flex flex-col gap-6 bg-ink px-5 pb-8 pt-14 text-paper lg:px-[120px] lg:pb-14 lg:pt-24">
      <p className="label !text-dark-muted">{label}</p>
      <Link to={to} className="flex items-center justify-between gap-6">
        <span className="font-serif text-[clamp(40px,6.1vw,88px)] font-light leading-none tracking-[-0.025em]">
          {title}
        </span>
        <Icon name="arrow-right-light-lg.svg" size={56} inset="-1.34%" className="hidden lg:inline-block" />
      </Link>

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
          <a href={RESUME_URL} download={RESUME_FILENAME} className="inline-flex items-center gap-[10px] font-sans text-[16px] font-medium underline">
            Download résumé
            <Icon name="arrow-down.svg" />
          </a>
        </div>
      </div>
    </footer>
  );
}
