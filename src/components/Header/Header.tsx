import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo/MarryOh-edit.png"

const DESKTOP_WIDTH = 1024;

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleNav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (window.innerWidth < DESKTOP_WIDTH) {
      setIsNavOpen((prev) => !prev);
    }
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNavOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_WIDTH) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "auto";
  }, [isNavOpen]);




  return (
    <header onClick={closeNav}>
      <div className={styles["header-inner"]}>

        <a className={styles.logo} href="#">
          <img src={logo} alt="logo" />
        </a>

        <nav
          className={`${styles.nav} ${isNavOpen ? styles.open : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles["menu-container"]}>
            <a href="#about" onClick={closeNav}>셀프웨딩</a>
            <a href="#skills" onClick={closeNav}>커뮤니티</a>
          </div>

          <div className={styles["auth-container"]}>
            <a href="#">로그인</a>
            <span className="vertical-divider"></span>
            <a href="#">회원가입</a>
          </div>
        </nav>


        <button
          type="button"
          className={styles.hamburger}
          onClick={toggleNav}
          aria-label={isNavOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isNavOpen}
        >

          <i className={`fas ${isNavOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}