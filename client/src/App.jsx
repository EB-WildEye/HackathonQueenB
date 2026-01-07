import { Routes, Route } from 'react-router'
import RootLayout from "./layouts/RootLayout.jsx";
import LandingPage from './pages/LandingPage/LandingPage';
import HomePage from './pages/HomePage/HomePage';
import Content from "./pages/Content/Content";
import About from "./pages/About/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<RootLayout />}>
        <Route path="/chat" element={<HomePage />} />
        <Route path="/content" element={<Content />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
