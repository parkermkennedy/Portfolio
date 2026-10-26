import CaseStudyPage from '../components/CaseStudyPage.jsx';
import { CASE_STUDY_PORTFOLIO as cs } from '../data.js';
import { asset } from '../lib/assets.js';

export default function CaseStudyPortfolio() {
  return (
    <CaseStudyPage
      cs={cs}
      before={{ src: asset('portfolio-before.png'), alt: 'The original portfolio home page, built in Figma Sites' }}
      after={{ src: asset('portfolio-after.png'), alt: 'The rebuilt portfolio home page' }}
      imgClassName="object-top lg:h-[360px]"
      next={{ label: 'Next project · password protected', title: 'Next-Gen Calman', to: '/work/next-gen-calman' }}
    />
  );
}
