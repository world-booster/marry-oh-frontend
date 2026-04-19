import { useParams } from "react-router-dom";
import { useRef } from "react";
import styles from "@/components/Layout/Header/Header.module.css";
import Logo from "@/components/Logo/Logo";
import MainMenu from "@/components/Layout/Header/Navigation/MainMenu";
import SubMenu from "@/components/Layout/Header/Navigation/SubMenu";
import AccountMenu from "@/components/Layout/Header/Navigation/AccountMenu";
import type { MainMenuKey, SubMenuKey } from "@/constants/menu";

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);

  const { main, sub } = useParams();

  const selectedMainMenu = (main ?? "wedding") as MainMenuKey;
  const selectedSubMenu = (sub ?? "home") as SubMenuKey;
  return (
    <>
      <header>
        <div className={styles["header-inner"]} ref={navRef}>
          <div className={styles["logo-container"]}>
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