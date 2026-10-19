import Icon from './Icon.jsx';

/**
 * Home-page project entry: an image "plate" on top, then title / detail.
 * Mobile stacks everything; on desktop the title sits in a 520px left column
 * and the tagline, description, meta and link sit in the right column.
 */
export default function ProjectCard({ plate, title, company, tagline, description, meta, link }) {
  return (
    <article className="flex w-full flex-col gap-5 lg:gap-12">
      {plate}

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[520px_1fr] lg:gap-x-24 lg:gap-y-8">
        <div className="flex flex-col gap-3 lg:col-start-1 lg:row-start-1">
          <h3 className="font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.01em] lg:text-[48px] lg:leading-[1.05] lg:tracking-[-0.015em]">
            {title}
          </h3>
          <p className="hidden font-sans text-[16px] text-muted lg:block">{company}</p>
        </div>

        <p className="font-serif text-[22px] font-normal leading-[1.25] tracking-[-0.004em] lg:col-start-2 lg:text-[30px] lg:tracking-[-0.006em]">
          {tagline}
        </p>
        <p className="font-sans text-[17px] leading-[1.5] lg:col-start-2 lg:text-[19px]">
          {description}
        </p>

        <dl className="flex gap-8 lg:col-start-2 lg:gap-12">
          {meta.map((m) => (
            <div key={m.label} className={`flex flex-col gap-1 lg:gap-[6px] ${m.desktopOnly ? 'hidden lg:flex' : ''}`}>
              <dt className="label">{m.label}</dt>
              <dd className="font-sans text-[15px] lg:text-[16px]">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="lg:col-start-2">{link}</div>
      </div>
    </article>
  );
}

export function DisabledLink({ children }) {
  // The Next-Gen Calman case study is intentionally not published yet.
  return (
    <span
      className="text-link cursor-not-allowed"
      aria-disabled="true"
      title="This case study isn’t available yet"
    >
      {children}
      <Icon name="arrow-right.svg" />
    </span>
  );
}
