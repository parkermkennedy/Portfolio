import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CaseStudyCalman5 from './pages/CaseStudyCalman5.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work/calman-5-workflow-makeover" element={<CaseStudyCalman5 />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
