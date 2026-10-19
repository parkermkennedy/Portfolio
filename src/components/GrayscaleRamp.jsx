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

      <figcaption className="font-sans text-[13px] leading-[1.5] text-muted lg:w-[560px] lg:text-[14px]">
        A 21-step grayscale ramp, 0–100% — the first pattern measured in almost every display
        calibration. On an accurate screen each step reads as neutral gray, evenly brighter than
        the last.
      </figcaption>
    </figure>
  );
}
