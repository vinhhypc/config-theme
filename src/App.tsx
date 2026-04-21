import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Shadcn from "@/pages/Shadcn";
import { ThemeProvider } from "@/theme/ThemeContext";
import { ShadcnThemeProvider } from "@/theme/ShadcnThemeContext";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider>
              <Home />
            </ThemeProvider>
          }
        />
        <Route
          path="/shadcn"
          element={
            <ShadcnThemeProvider>
              <Shadcn />
            </ShadcnThemeProvider>
          }
        />
        <Route
          path="/other"
          element={
            <div className="text-center text-xl">Other Page - Coming Soon</div>
          }
        />
      </Routes>
    </Router>
  );
}
