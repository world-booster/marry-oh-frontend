import { useEffect, useState, useRef } from "react";
import styles from "./Header.module.css";
import Navigation from "./Navigation/Navigation";
import SecondaryNavigation from "./Navigation/SecondaryNavigation";
import Logo from "./Logo";
import Hamburger from "./HamburgerButton";
import AccoutPanel from "./Navigation/AccountPanel";


export type MainMenuKey = "wedding" | "hall" | "community";

const DESKTOP_WIDTH = 1024;

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MainMenuKey>("wedding");
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < DESKTOP_WIDTH
  );

  //메뉴선택
  const handleMenuChange = (menu: MainMenuKey) => {
    setSelectedMenu(menu);
  };

  //모바일-메뉴토글
  const toggleNav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isMobile) return;
    setIsNavOpen((prev) => !prev);
  };

  //모바일-메뉴닫기
  const closeNav = () => {
    setIsNavOpen(false);
  };

  //모바일-메뉴닫기-esc키/데스크탑 리사이징/메뉴외부클릭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeNav();
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < DESKTOP_WIDTH);

      if (!isMobile) {
        closeNav();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        closeNav();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);

    };
  }, []);


  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);


  return (
    <div>
      <header>
        <div className={styles["header-inner"]} ref={navRef}>
          <Logo />
          <Navigation
            isNavOpen={isNavOpen}
            selectedMenu={selectedMenu}
            closeNav={closeNav}
            onMenuChange={handleMenuChange}
          />

          <AccoutPanel />

          <Hamburger isNavOpen={isNavOpen} toggleNav={toggleNav} />
        </div>
      </header>
      <SecondaryNavigation selectedMenu={selectedMenu} />
    </div>
  );
}