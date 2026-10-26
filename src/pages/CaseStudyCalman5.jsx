import CaseStudyPage from '../components/CaseStudyPage.jsx';
import { CASE_STUDY_CALMAN5 as cs } from '../data.js';
import { asset } from '../lib/assets.js';

export default function CaseStudyCalman5() {
  return (
    <CaseStudyPage
      cs={cs}
      before={{ src: asset('cs-before.png'), alt: 'Calman 5 workflow before the makeover' }}
      after={{ src: asset('cs-after.png'), alt: 'Calman 5 workflow after the makeover' }}
      next={{ label: 'Next project', title: 'Portfolio rebuild', to: '/work/portfolio-rebuild' }}
    />
  );
}
