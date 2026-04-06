import React, { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNavActive((prev) => !prev);
  };

  const closeNav = () => setIsNavActive(false);

  return (
    <header onClick={closeNav}>
      <div className={styles['header-inner']}>
        <a className={styles.logo} href="#">HEESUN YOON</a>

        <nav className={`${styles.nav} ${isNavActive ? styles.active : ''}`} onClick={(e) => e.stopPropagation()}>
          <a href="#about" onClick={closeNav}>소개</a>
          <a href="#skills" onClick={closeNav}>기술스택</a>
          <a href="#projects" onClick={closeNav}>프로젝트</a>
          <a href="#career" onClick={closeNav}>경력</a>
          <a href="#education" onClick={closeNav}>학력</a>
          <a href="#contact" onClick={closeNav}>연락처</a>
        </nav>

        <div className={`${styles.hamburger} ${isNavActive ? styles.active : ''}`} onClick={toggleNav}>
          <i className="fas fa-bars"></i>
          <i className="fas fa-times"></i>
        </div>
      </div>
    </header>
  );
}