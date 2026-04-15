import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@/pages/Home/HomePage";
import LoginPage from "@/pages/Login/LoginPage";
import AboutPage from "@/pages/About/AboutPage";
import SignupPage from "@/pages/Signup/SignupPage";
import { Layout } from "@/components/Layout/Layout";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
      <footer />
    </BrowserRouter>
  );
}