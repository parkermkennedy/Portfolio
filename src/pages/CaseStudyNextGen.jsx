import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { CaseStudySection, NextProjectFooter, TlDr } from '../components/CaseStudy.jsx';
import NextGenPlate from '../components/NextGenPlate.jsx';
import { focusElement, PageSlot } from '../components/Layout.jsx';
import { NEXTGEN_GATE as gate, REQUEST_ACCESS_SUBJECT, REQUEST_ACCESS_BODY } from '../data.js';
import { EMAIL } from '../lib/assets.js';
import useDocumentTitle from '../lib/useDocumentTitle.js';
import {
  decryptCaseStudy,
  forgetPassword,
  recallPassword,
  rememberPassword,
  WrongPasswordError,
} from '../lib/protected.js';

const requestAccessHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
  REQUEST_ACCESS_SUBJECT
)}&body=${encodeURIComponent(REQUEST_ACCESS_BODY)}`;

function Gate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | wrong | failed
  const [failure, setFailure] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password || status === 'checking') return;
    setStatus('checking');
    try {
      const content = await decryptCaseStudy(gate.slug, password);
      rememberPassword(gate.slug, password);
      onUnlock(content);
    } catch (err) {
      if (err instanceof WrongPasswordError) {
        setStatus('wrong');
      } else {
        setFailure(err.message);
        setStatus('failed');
      }
    }
  }

  const wrong = status === 'wrong';
  const failed = status === 'failed';
  // text-error, not the accent: the accent is too light for 14px text on the sand form.
  const errorText = 'text-error';

  return (
    <section className="gutter pb-16 lg:pb-[120px]">
      <div className="flex flex-col gap-8 border-t border-rule pt-10 lg:flex-row lg:items-start lg:gap-24 lg:pt-14">
        <div className="flex min-w-px flex-1 flex-col gap-4 lg:gap-6">
          <h2 className="font-serif text-[28px] font-normal leading-[1.15] tracking-[-0.008em] lg:text-[34px]">
            Read the full case study
          </h2>
          <p className="font-sans text-[17px] leading-[1.55] text-muted lg:text-[19px]">{gate.intro}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-[4px] bg-sand p-6 lg:w-[480px] lg:shrink-0 lg:p-12"
          noValidate
        >
          <h3 className="font-serif text-[28px] font-normal tracking-[-0.008em] lg:text-[32px]">Enter password</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="case-study-password" className="font-sans text-[14px] font-medium">
              Password
            </label>
            <input
              id="case-study-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (wrong) setStatus('idle');
              }}
              aria-invalid={wrong}
              aria-describedby={wrong || failed ? 'case-study-password-error' : undefined}
              className={`h-14 w-full rounded-[2px] border bg-white px-4 font-sans text-[18px] text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-sand ${
                wrong ? 'border-accent' : 'border-ink'
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'checking'}
            className="inline-flex w-full items-center justify-center gap-3 rounded-[2px] bg-ink px-6 py-[18px] font-sans text-[16px] font-medium text-paper disabled:cursor-wait disabled:opacity-80"
          >
            {status === 'checking' ? 'Unlocking…' : 'View case study'}
            <Icon name="arrow-right-light.svg" />
          </button>

          <div aria-live="polite">
            {wrong && (
              <p id="case-study-password-error" className={`flex items-start gap-2 font-sans text-[14px] leading-[1.3] ${errorText}`}>
                <span className="mt-[5px] size-[6px] shrink-0 bg-accent" aria-hidden="true" />
                That password didn’t work. Check for typos, or request access below and I’ll resend it.
              </p>
            )}
            {failed && (
              <p id="case-study-password-error" className={`font-sans text-[14px] leading-[1.3] ${errorText}`}>
                {failure} Please try again.
              </p>
            )}
          </div>

          <hr className="border-rule" />
          <div className="flex flex-col gap-3">
            <p className="font-sans text-[15px] leading-[1.55] text-muted">
              Don’t have the password? Request access and I’ll send it to you.
            </p>
            <a
              href={requestAccessHref}
              className="inline-flex w-full items-center justify-center gap-3 rounded-[2px] border border-ink px-6 py-[14px] font-sans text-[16px] font-medium text-ink"
            >
              Request access
              <Icon name="arrow-ext.svg" />
            </a>
            <p className="font-sans text-[13px] leading-[1.5] text-muted">
              Opens your email app. Or write to{' '}
              <a href={`mailto:${EMAIL}`} className="font-medium underline">
                {EMAIL}
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

/** Public preview shown before unlocking: the summary, without anything confidential. */
function Preview() {
  return (
    <>
      <header className="gutter pb-12 pt-10 lg:pb-[72px] lg:pt-16">
        <Link to="/#work" className="text-link">
          <Icon name="arrow-left.svg" />
          All work
        </Link>

        <p className="mt-12 flex items-center gap-[10px] font-sans text-[15px] font-medium text-accent lg:mt-[72px] lg:text-[16px]">
          <Icon name="lock-red.svg" size={18} height={20} inset="-3.75% -4.17%" />
          Preview · full case study is password protected
        </p>
        <h1 className="mt-5 font-serif text-[clamp(48px,8.3vw,120px)] font-light leading-[0.95] tracking-[-0.03em] lg:mt-6">
          {gate.title}
        </h1>
        <p className="mt-4 font-sans text-[18px] text-muted lg:mt-6 lg:text-[20px]">{gate.company}</p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-ink pt-7 lg:mt-[72px] lg:grid-cols-4 lg:gap-12">
          {gate.meta.map((m) => (
            <div key={m.label} className="flex min-w-px flex-col gap-2">
              <dt className="label">{m.label}</dt>
              <dd className="font-sans text-[16px] leading-[1.4] lg:text-[18px]">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="gutter">
        <NextGenPlate />
      </div>

      <section className="gutter flex flex-col gap-6 pb-14 pt-16 lg:flex-row lg:gap-24 lg:pb-24 lg:pt-[120px]">
        <h2 className="label lg:w-[264px] lg:shrink-0">At a glance</h2>
        <div className="flex min-w-px flex-1 flex-col gap-10">
          <p className="font-serif text-[26px] font-normal leading-[1.3] tracking-[-0.008em] lg:text-[36px]">
            {gate.teaser}
          </p>
          <div className="flex flex-col gap-5 border-t border-ink pt-6">
            <h3 className="label">What’s inside</h3>
            <ul className="flex flex-col gap-3">
              {gate.contents.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="flex pt-3" aria-hidden="true">
                    <span className="size-[6px] shrink-0 bg-accent" />
                  </span>
                  <span className="min-w-px flex-1 font-sans text-[16px] leading-[1.6] lg:text-[18px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function NdaBanner() {
  return (
    <PageSlot name="banner">
      <aside
        aria-label="Confidentiality notice"
        className="flex items-center justify-center gap-3 bg-ink px-5 py-[14px] text-paper"
      >
        <Icon name="lock.svg" size={14} height={16} inset="-4.69% -5.36%" className="shrink-0" />
        <p className="font-sans text-[13px] leading-[1.4] lg:text-[14px]">
          Confidential: this case study covers an unreleased product and is shared under NDA. Please
          don’t share it or take screenshots.
        </p>
      </aside>
    </PageSlot>
  );
}

function CaseStudy({ cs, focusHeading }) {
  const headingRef = useRef(null);
  // After unlocking, the form the reader was in is gone: start them at the top.
  useEffect(() => {
    if (!focusHeading) return;
    window.scrollTo(0, 0);
    focusElement(headingRef.current);
  }, [focusHeading]);

  return (
    <>
      <NdaBanner />

      <header className="gutter pb-12 pt-10 lg:pb-[72px] lg:pt-16">
        <Link to="/#work" className="text-link">
          <Icon name="arrow-left.svg" />
          All work
        </Link>

        <h1
          ref={headingRef}
          className="mt-12 font-serif text-[clamp(48px,8.3vw,120px)] font-light leading-[0.95] tracking-[-0.03em] lg:mt-[72px]"
        >
          {gate.title}
        </h1>
        <p className="mt-4 font-sans text-[18px] text-muted lg:mt-6 lg:text-[20px]">{gate.company}</p>

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
        <div className="flex justify-center overflow-clip rounded-[4px] bg-plate px-5 py-6 lg:p-[72px]">
          <img
            src={cs.hero.src}
            alt={cs.hero.alt}
            className="h-auto w-full max-w-[880px] object-cover shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:h-[666px]"
          />
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

      <PageSlot name="footer">
        <NextProjectFooter
          label="Next project"
          title="Calman 5 Workflow Makeover"
          to="/work/calman-5-workflow-makeover"
        />
      </PageSlot>
    </>
  );
}

export default function CaseStudyNextGen() {
  useDocumentTitle(gate.title);
  const [content, setContent] = useState(null);
  const [justUnlocked, setJustUnlocked] = useState(false);
  // If this tab already unlocked it, decrypt again quietly instead of
  // flashing the gate.
  const [restoring, setRestoring] = useState(() => Boolean(recallPassword(gate.slug)));

  useEffect(() => {
    const saved = recallPassword(gate.slug);
    if (!saved) return;
    let cancelled = false;
    decryptCaseStudy(gate.slug, saved)
      .then((c) => !cancelled && setContent(c))
      .catch(() => forgetPassword(gate.slug)) // password changed since: ask again
      .finally(() => !cancelled && setRestoring(false));
    return () => {
      cancelled = true;
    };
  }, []);

  if (content) return <CaseStudy cs={content} focusHeading={justUnlocked} />;
  if (restoring) {
    return (
      <div className="min-h-[60vh]" role="status" aria-busy="true">
        <p className="sr-only">Loading case study…</p>
      </div>
    );
  }
  return (
    <>
      <Preview />
      <Gate
        onUnlock={(c) => {
          setContent(c);
          setJustUnlocked(true);
        }}
      />
    </>
  );
}
