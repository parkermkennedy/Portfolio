// 21-step grayscale ramp, 0–100% in 5% steps. Values are computed so they
// match the Figma swatches exactly (e.g. 5% → #0d0d0d, 50% → #808080).
const STEPS = Array.from({ length: 21 }, (_, i) => {
  const v = Math.round(i * 5 * 2.55);
  return { pct: i * 5, color: `rgb(${v}, ${v}, ${v})` };
});

export default function GrayscaleRamp() {
  return (
    <figure className="flex w-full flex-col gap-[10px]">
      <div
        className="flex w-full items-start overflow-clip border border-rule"
        role="img"
        aria-label="Grayscale ramp from 0 to 100 percent in 5 percent steps"
      >
        {STEPS.map((s) => (
          <div
            key={s.pct}
            className="h-10 min-w-px flex-1 lg:h-14"
            style={{ backgroundColor: s.color }}
            data-pct={s.pct}
          />
        ))}
      </div>

      {/* Desktop: all 21 labels */}
      <div className="hidden w-full font-mono text-[11px] text-muted lg:flex" aria-hidden="true">
        {STEPS.map((s) => (
          <span key={s.pct} className="min-w-px flex-1">
            {s.pct}
          </span>
        ))}
      </div>
      {/* Mobile: 0 / 50 / 100 only */}
      <div className="flex w-full justify-between font-mono text-[11px] text-muted lg:hidden" aria-hidden="true">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>

      {/* Stacked on mobile; one row on desktop, each heading followed by its text */}
      <figcaption className="flex flex-col gap-2 font-sans text-[13px] leading-[20px] text-muted lg:flex-row lg:text-[14px] lg:leading-[21px]">
        <span className="shrink-0 font-medium text-ink">Grayscale Ramp</span>
        <span className="min-w-px flex-1">
          A series of gray tones ranging from black (0%) to white (100%), used to check grayscale
          accuracy and identify unwanted color tints or inconsistencies in brightness across the
          range.
        </span>
        <span className="shrink-0 font-medium text-ink">What to look for</span>
        <span className="min-w-px flex-1">
          Each shade should appear neutral, without noticeable red, green, or blue tints. Brightness
          should transition smoothly from black to white without unexpected jumps or visible banding.
        </span>
      </figcaption>
    </figure>
  );
}
