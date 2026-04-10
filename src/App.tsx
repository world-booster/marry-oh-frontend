import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { useMediaQuery } from "./hooks/useMediaQuery";

import Header from "./components/Layout/Header/Header";
import SideMenu from "./components/Layout/SideMenu/SideMenu";
import SideMenuTrigger from "./components/Layout/SideMenu/SideMenuTrigger";

import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import AboutPage from "./pages/About/AboutPage";
import SignupPage from "./pages/Signup/SignupPage";


const MOBILE_QUERY = "(max-width: 1024px)";

export default function App() {
  /* 모바일여부확인 */
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <BrowserRouter>
      <Header />

      {isMobile && (
        <>
          <SideMenuTrigger isOpen={isMenuOpen} onClick={handleToggleMenu} />
          <SideMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
        </>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <footer />
    </BrowserRouter>
  );
}