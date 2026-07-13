import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Solutions from './pages/Solutions.jsx'
import Technology from './pages/Technology.jsx'
import Calculator from './pages/Calculator.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Sustainability from './pages/Sustainability.jsx'
import News from './pages/News.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="technology" element={<Technology />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="sustainability" element={<Sustainability />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<ArticleDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
