import CaseStudyPage from '../components/CaseStudyPage.jsx';
import { CASE_STUDY_CALMAN5 as cs } from '../data.js';
import { asset } from '../lib/assets.js';

export default function CaseStudyCalman5() {
  return (
    <CaseStudyPage
      cs={cs}
      before={{ src: asset('cs-before.png'), alt: 'The old Calman 5 Pre Calibration Capture page: a gamut chart, RGB balance, EOTF, luminance and two DeltaE charts, with one line of instructions and an empty notes panel' }}
      after={{ src: asset('cs-after.png'), alt: 'The redesigned SDR Pre-Cal page: a Display Performance summary of average and max DeltaE for saturation sweeps, ColorChecker and grayscale, a prominent Measure button, and DeltaE 2000 and ITP charts for each test' }}
      next={{ label: 'Next project', title: 'Portfolio rebuild', to: '/work/portfolio-rebuild' }}
    />
  );
}
