import { Routes, Route } from 'react-router'
import RootLayout from "./layouts/RootLayout.jsx";
import HomePage from './pages/HomePage/HomePage';
import Content from "./pages/Content/Content";
import About from "./pages/About/About";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />

        {/* TODO*/}
        <Route path="/content" element={<Content />} />
        <Route path="/about" element={<About />} />
        
      </Route>
    </Routes>
  );
}

export default App;
