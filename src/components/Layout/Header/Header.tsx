import { useLocation } from "react-router-dom";
import { useRef } from "react";
import styles from "@/components/Layout/Header/Header.module.css";
import Logo from "@/components/Logo/Logo";
import MainMenu from "@/components/Layout/Header/Navigation/MainMenu";
import SubMenu from "@/components/Layout/Header/Navigation/SubMenu";
import AccountMenu from "@/components/Layout/Header/Navigation/AccountMenu";
import type { MainMenuKey, SubMenuKey } from "@/constants/menu";

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const [main, sub] = segments;
  const selectedMainMenu = (main ?? "wedding") as MainMenuKey;
  const selectedSubMenu = (sub ?? "home") as SubMenuKey;
  return (
    <>
      <header>
        <div className={styles.headInner} ref={navRef}>
          <div className={styles["logoContainer"]}>
            <Logo />
          </div>
          <MainMenu selectedMainMenu={selectedMainMenu} />
          <AccountMenu />
        </div>
      </header>

      <SubMenu
        selectedMainMenu={selectedMainMenu}
        selectedSubMenu={selectedSubMenu}
      />
    </>
  );
}