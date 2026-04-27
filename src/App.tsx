import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "@/pages/Error/ErrorPages";
import AppRouter from "@/router/AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppRouter />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}