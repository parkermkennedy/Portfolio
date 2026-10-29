import CaseStudyPage from '../components/CaseStudyPage.jsx';
import { CASE_STUDY_PORTFOLIO as cs } from '../data.js';
import { asset } from '../lib/assets.js';

export default function CaseStudyPortfolio() {
  return (
    <CaseStudyPage
      cs={cs}
      before={{ src: asset('portfolio-before.png'), alt: 'The original portfolio home page: a centered “Hi, I’m Parker Kennedy” headline, a short intro and plain project cards in a generic sans-serif layout' }}
      after={{ src: asset('portfolio-after.png'), alt: 'The rebuilt home page: a large serif headline, “Making expert tools feel effortless.”, on warm off-white, a short intro and a 21-step grayscale ramp' }}
      imgClassName="object-top lg:h-[360px]"
      next={{ label: 'Next project · password protected', title: 'Next-Gen Calman', to: '/work/next-gen-calman' }}
    />
  );
}
