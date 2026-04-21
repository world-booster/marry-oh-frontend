import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout/Layout";
import HomePage from "@/pages/Home/HomePage";
import PageRouter from "@/pages/PageRouter";
import { NotFoundPage } from "@/pages/Error/ErrorPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/:main/*" element={<PageRouter />} />
        </Route>

        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}