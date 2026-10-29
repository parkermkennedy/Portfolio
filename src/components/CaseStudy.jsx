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
    case 'flow':
      return <Flow block={block} />;
    case 'image':
      return (
        <img
          src={block.src}
          alt={block.alt}
          className="h-auto w-full rounded-[4px] object-cover lg:h-[575px]"
        />
      );
    case 'gallery':
      return <Gallery block={block} />;
    default:
      return null;
  }
}

function LoopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.5 1.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** One numbered step the user performs, joined to the next by a vertical line. */
function FlowStep({ n, text, last }) {
  return (
    <li className="relative flex items-start gap-3 pb-3 last:pb-0">
      {!last && <span className="absolute bottom-0 left-[11.5px] top-6 w-px bg-ink/30" aria-hidden="true" />}
      <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-ink bg-paper font-mono text-[11px]">
        {n}
      </span>
      <span className="min-w-px flex-1 pt-[2px] font-sans text-[15px] leading-[1.4]">{text}</span>
    </li>
  );
}

/**
 * Two processes side by side (stacked on mobile). Each column's items are
 * step strings or a group: `repeat` wraps numbered steps in a dashed loop,
 * `auto` shows steps the app runs on its own as chips on a dark block.
 */
function Flow({ block }) {
  return (
    <figure className="flex flex-col gap-6">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-10">
        {block.columns.map((col) => {
          let n = 0;
          return (
            <div key={col.heading} className="flex min-w-px flex-1 flex-col gap-5">
              <div className="flex flex-col gap-1 border-t border-ink pt-5">
                <h3 className="font-sans text-[18px] font-medium">{col.heading}</h3>
                <p className="font-sans text-[15px] leading-[1.45] text-muted">{col.summary}</p>
              </div>
              <ol className="flex flex-col">
                {col.items.map((item, i) => {
                  const last = i === col.items.length - 1;
                  if (typeof item === 'string') return <FlowStep key={item} n={++n} text={item} last={last} />;
                  if (item.kind === 'repeat') {
                    return (
                      <li key={item.label} className="flex flex-col gap-4 rounded-[4px] border border-dashed border-accent p-4">
                        <div className="flex flex-col gap-1">
                          <p className="flex items-center gap-2 font-sans text-[14px] font-medium text-accent">
                            <LoopIcon />
                            {item.label}
                          </p>
                          <p className="font-sans text-[13px] leading-[1.4] text-muted">{item.note}</p>
                        </div>
                        <ol className="flex flex-col">
                          {item.steps.map((step, j) => (
                            <FlowStep key={step} n={++n} text={step} last={j === item.steps.length - 1} />
                          ))}
                        </ol>
                      </li>
                    );
                  }
                  return (
                    <li key={item.label} className="relative pt-3">
                      <span className="absolute left-[11.5px] top-0 h-3 w-px bg-ink/30" aria-hidden="true" />
                      <div className="flex flex-col gap-3 rounded-[4px] bg-ink p-4 text-paper">
                        <div className="flex flex-col gap-1">
                          <p className="font-sans text-[14px] font-medium">{item.label}</p>
                          <p className="font-sans text-[13px] leading-[1.4] text-dark-muted">{item.note}</p>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                          {item.steps.map((step) => (
                            <li
                              key={step}
                              className="rounded-[2px] border border-dark-rule px-2 py-1 font-sans text-[12px] leading-[1.3] text-dark-muted"
                            >
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
      {block.caption && (
        <figcaption className="font-sans text-[14px] leading-[1.5] text-muted">{block.caption}</figcaption>
      )}
    </figure>
  );
}

/**
 * Uncropped screenshots with optional labels and notes, plus one shared caption.
 * `columns: 2` puts them side by side on desktop; with an odd count the last
 * one spans the full width (e.g. two earlier versions above the shipped one).
 */
function Gallery({ block }) {
  const two = block.columns === 2;
  return (
    <figure className="flex flex-col gap-4">
      <div className={`grid gap-6 ${two ? 'lg:grid-cols-2 lg:gap-x-5 lg:gap-y-8' : ''}`}>
        {block.items.map((item, i) => {
          const spanLast = two && block.items.length % 2 === 1 && i === block.items.length - 1;
          return (
            <div key={item.src} className={`flex min-w-px flex-col gap-3 ${spanLast ? 'lg:col-span-2' : ''}`}>
              {item.label && <p className="label">{item.label}</p>}
              <img src={item.src} alt={item.alt} loading="lazy" className="h-auto w-full rounded-[4px]" />
              {item.note && <p className="font-sans text-[14px] leading-[1.5] text-muted">{item.note}</p>}
            </div>
          );
        })}
      </div>
      {block.caption && (
        <figcaption className="font-sans text-[14px] leading-[1.5] text-muted">{block.caption}</figcaption>
      )}
    </figure>
  );
}

/** Three-line skim of the case study (Problem / What I did / Result), shown in the header. */
export function TlDr({ items }) {
  if (!items?.length) return null;
  return (
    <section
      aria-labelledby="tldr-heading"
      className="mt-10 flex flex-col gap-5 rounded-[4px] bg-sand p-6 lg:mt-14 lg:gap-6 lg:p-10"
    >
      <h2 id="tldr-heading" className="label">TL;DR</h2>
      <dl className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        {items.map((item) => (
          <div key={item.label} className="flex min-w-px flex-col gap-2">
            <dt className="font-sans text-[14px] font-medium lg:text-[15px]">{item.label}</dt>
            <dd className="font-sans text-[16px] leading-[1.55] lg:text-[17px]">{item.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
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
            <span className="sr-only"> (opens in a new tab)</span>
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
