import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CaseStudyCalman5 from './pages/CaseStudyCalman5.jsx';
import CaseStudyNextGen from './pages/CaseStudyNextGen.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work/next-gen-calman" element={<CaseStudyNextGen />} />
        <Route path="work/calman-5-workflow-makeover" element={<CaseStudyCalman5 />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
