// env
const { VITE_PREFIX } = import.meta.env;

// react
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Layout from "@/components/Layout";

// pages
import Home from "@/pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={`${VITE_PREFIX}`}
          element={
            <Layout title={"HOME"}>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
