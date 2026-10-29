import { Link } from 'react-router-dom';
import GrayscaleRamp from '../components/GrayscaleRamp.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import NextGenPlate from '../components/NextGenPlate.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import Icon from '../components/Icon.jsx';
import { PageSlot } from '../components/Layout.jsx';
import { JOBS, SKILL_COLUMNS } from '../data.js';
import { asset, RESUME_URL, RESUME_FILENAME } from '../lib/assets.js';
import useDocumentTitle from '../lib/useDocumentTitle.js';

const h2 =
  'font-serif text-[40px] font-normal leading-[1.05] tracking-[-0.015em] lg:text-[64px] lg:leading-none lg:tracking-[-0.02em]';

function Hero() {
  return (
    <section className="gutter flex flex-col gap-8 pb-14 pt-16 lg:gap-[72px] lg:pb-24 lg:pt-[120px]">
      <h1 className="font-serif text-[clamp(60px,9.45vw,136px)] font-light leading-[0.95] tracking-[-0.03em] lg:leading-[0.92]">
        Making expert tools <br className="hidden lg:block" />
        feel <em className="font-light italic">effortless</em>
        <span className="text-accent">.</span>
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-12">
        <p className="font-sans text-[18px] leading-[1.5] text-muted lg:w-[560px] lg:text-[22px] lg:leading-[1.45]">
          I’m Parker, a UX/UI engineer in Seattle. Since 2021 I’ve designed color-calibration
          software at Portrait Displays, turning workflows built for specialists into ones anyone
          can finish.
        </p>
        <div className="hidden min-w-px flex-1 lg:block" aria-hidden="true" />
        <div className="flex flex-col gap-1 font-sans text-[15px] lg:gap-[6px] lg:text-[16px]">
          <span className="font-medium">UX/UI Engineer</span>
          <span className="text-muted">Portrait Displays, Inc.</span>
        </div>
      </div>

      <GrayscaleRamp />
    </section>
  );
}

// Before / After plate for a project card. On mobile only the After shot shows.
function BeforeAfterPlate({ before, after, imgClassName = '' }) {
  return (
    <div className="flex w-full items-start justify-center gap-6 overflow-clip rounded-[4px] bg-plate px-5 py-6 lg:p-16">
      <figure className="hidden min-w-px flex-1 flex-col gap-4 lg:flex">
        <figcaption className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-plate-label">
          Before
        </figcaption>
        <img src={before.src} alt={before.alt} className={`h-[257px] w-full object-cover ${imgClassName}`} />
      </figure>
      <figure className="flex min-w-px flex-1 flex-col gap-4">
        <figcaption className="hidden font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-plate-label lg:block">
          After
        </figcaption>
        <img src={after.src} alt={after.alt} className={`h-[153px] w-full object-cover lg:h-[257px] ${imgClassName}`} />
      </figure>
    </div>
  );
}

function SelectedWork() {
  return (
    <section
      id="work"
      className="gutter flex scroll-mt-4 flex-col gap-16 border-t border-rule pb-[72px] pt-14 lg:gap-[120px] lg:pb-[160px] lg:pt-[120px]"
    >
      <div className="flex items-baseline justify-between">
        <h2 className={h2}>Selected work</h2>
        <p className="hidden font-sans text-[16px] text-muted lg:block">Three projects</p>
      </div>

      <ProjectCard
        to="/work/next-gen-calman"
        plate={<NextGenPlate />}
        title="Next-Gen Calman"
        company="Portrait Displays, Inc."
        tagline="From dozens of manual steps to one guided flow."
        description="A guided desktop calibration app for home users. It turns a long, expert-only process into a single automated flow."
        meta={[
          { label: 'Role', value: 'Sole UX/UI Designer' },
          { label: 'Timeline', value: '2024–present' },
          { label: 'Platform', value: 'Desktop (Windows/Mac)', desktopOnly: true },
        ]}
        link={
          <Link to="/work/next-gen-calman" className="text-link">
            Preview case study<span className="sr-only">: Next-Gen Calman</span>
            <Icon name="arrow-right.svg" />
          </Link>
        }
      />

      <ProjectCard
        to="/work/calman-5-workflow-makeover"
        plate={
          <BeforeAfterPlate
            before={{ src: asset('c5-before.png'), alt: 'The old Calman 5 Pre Calibration Capture page: a gamut chart, RGB balance, EOTF, luminance and two DeltaE charts, with one line of instructions and an empty notes panel' }}
            after={{ src: asset('c5-after.png'), alt: 'The redesigned SDR Pre-Cal page: a Display Performance summary of average and max DeltaE for saturation sweeps, ColorChecker and grayscale, a prominent Measure button, and DeltaE 2000 and ITP charts for each test' }}
          />
        }
        title="Calman 5 Workflow Makeover"
        company="Portrait Displays, Inc."
        tagline="New workflows now take minutes to build, not days."
        description="A facelift for the shipping Calman 5 workflows, aimed at cross-product consistency, user success rate, and usability."
        meta={[
          { label: 'Role', value: 'Workflow Designer' },
          { label: 'Timeline', value: '3 months' },
          { label: 'Team', value: 'Solo project', desktopOnly: true },
        ]}
        link={
          <Link to="/work/calman-5-workflow-makeover" className="text-link">
            View case study<span className="sr-only">: Calman 5 Workflow Makeover</span>
            <Icon name="arrow-right.svg" />
          </Link>
        }
      />

      <ProjectCard
        to="/work/portfolio-rebuild"
        plate={
          <BeforeAfterPlate
            before={{ src: asset('portfolio-before.png'), alt: 'The original portfolio home page: a centered “Hi, I’m Parker Kennedy” headline, a short intro and plain project cards in a generic sans-serif layout' }}
            after={{ src: asset('portfolio-after.png'), alt: 'The rebuilt home page: a large serif headline, “Making expert tools feel effortless.”, on warm off-white, a short intro and a 21-step grayscale ramp' }}
            imgClassName="object-top"
          />
        }
        title="Rebuilding my portfolio to keep up with my work"
        company="Personal project"
        tagline="Updates that took days now take hours."
        description="A rebuild of this site, from a static page builder to a coded site driven by my own design system, so the code and the Figma files stay in sync."
        meta={[
          { label: 'Role', value: 'Designer & front-end developer' },
          { label: 'Timeline', value: '1 week' },
          { label: 'Tools', value: 'Figma, React, AI', desktopOnly: true },
        ]}
        link={
          <Link to="/work/portfolio-rebuild" className="text-link">
            View case study<span className="sr-only">: Portfolio rebuild</span>
            <Icon name="arrow-right.svg" />
          </Link>
        }
      />
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="gutter flex scroll-mt-4 flex-col gap-6 bg-sand pb-16 pt-14 lg:flex-row lg:gap-24 lg:py-[160px]"
    >
      <div className="relative h-[420px] w-full shrink-0 overflow-hidden lg:h-[640px] lg:w-[520px]">
        {/* Mobile crop */}
        <img
          src={asset('about-photo-mobile.png')}
          alt="Portrait of Parker Kennedy"
          className="pointer-events-none absolute left-[-58.73%] top-0 h-full w-[158.73%] max-w-none lg:hidden"
        />
        {/* Desktop crop */}
        <img
          src={asset('about-photo.png')}
          alt="Portrait of Parker Kennedy"
          className="pointer-events-none absolute left-[-68.97%] top-[-4.21%] hidden h-[105.26%] w-[172.41%] max-w-none lg:block"
        />
      </div>

      <div className="flex min-w-px flex-1 flex-col gap-6 lg:gap-7">
        <h2 className={h2}>About me</h2>
        <p className="font-serif text-[24px] font-normal leading-[1.3] tracking-[-0.005em] lg:text-[30px]">
          I’m a UX/UI engineer who designs and maintains workflows for color-calibration software.
        </p>
        <p className="font-sans text-[17px] leading-[1.55] text-muted lg:text-[19px]">
          At Portrait Displays I lead design for the next generation of Calman, from research and
          iterative mockups through front-end handoff, and I maintain our Material Design–based
          design kit. I work where design meets engineering, for the studios, calibrators, and
          display manufacturers who need color exactly right.
        </p>

        <dl className="flex gap-8 border-t border-rule pt-5 lg:gap-16 lg:pt-7">
          {[
            { label: 'Experience', value: '5+ years' },
            { label: 'Focus', value: 'UX/UI design' },
            { label: 'Based in', value: 'Seattle, WA', desktopOnly: true },
          ].map((f) => (
            <div
              key={f.label}
              className={`flex flex-col gap-1 lg:gap-[6px] ${f.desktopOnly ? 'hidden lg:flex' : ''}`}
            >
              <dt className="label">{f.label}</dt>
              <dd className="whitespace-nowrap font-serif text-[24px] font-normal lg:text-[28px] lg:tracking-[-0.005em]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="gutter flex scroll-mt-4 flex-col gap-8 pb-16 pt-14 lg:gap-16 lg:py-[160px]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <h2 className={h2}>Résumé</h2>
        <a
          href={RESUME_URL}
          download={RESUME_FILENAME}
          className="inline-flex items-center justify-center gap-3 rounded-[2px] bg-ink px-6 py-4 font-sans text-[16px] font-medium text-paper"
        >
          Download PDF
          <Icon name="arrow-down.svg" />
        </a>
      </div>

      <ol className="flex flex-col lg:border-b lg:border-rule">
        {JOBS.map((job) => (
          <li
            key={job.dates + job.role}
            className="flex flex-col gap-2 border-t border-ink py-6 lg:flex-row lg:items-start lg:gap-12 lg:border-rule lg:py-9 lg:first:border-ink"
          >
            <p className="font-mono text-[13px] text-muted lg:w-[180px] lg:shrink-0 lg:text-[14px]">{job.dates}</p>
            <div className="flex flex-col gap-2 lg:w-[420px] lg:shrink-0 lg:gap-[6px]">
              <h3 className="font-serif text-[24px] font-normal tracking-[-0.005em] lg:text-[30px]">{job.role}</h3>
              <p className="font-sans text-[15px] text-muted lg:text-[16px]">{job.company}</p>
            </div>
            <p className="min-w-px flex-1 font-sans text-[16px] leading-[1.5] lg:text-[17px] lg:leading-[1.55]">
              <span className="lg:hidden">{job.mobileDescription ?? job.description}</span>
              <span className="hidden lg:inline">{job.description}</span>
            </p>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-7 lg:flex-row lg:gap-12 lg:pt-6">
        {SKILL_COLUMNS.map((col) => (
          <div key={col.label} className="flex min-w-px flex-1 flex-col gap-2 lg:gap-[10px]">
            <h3 className="label">{col.label}</h3>
            {/* Desktop: one item per line */}
            <ul className="hidden flex-col gap-[10px] pt-[6px] font-sans text-[15px] leading-[1.4] lg:flex">
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {/* Mobile: compact joined text (or one line per entry) */}
            <p className="font-sans text-[15px] leading-[1.55] lg:hidden">
              {col.joined
                ? col.items.join(' · ')
                : col.items.map((item) => (
                    <span key={item} className="block">
                      {item}
                    </span>
                  ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Resume />
      <PageSlot name="footer">
        <SiteFooter />
      </PageSlot>
    </>
  );
}
