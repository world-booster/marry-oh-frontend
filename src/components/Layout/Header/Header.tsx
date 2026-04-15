import { useRef } from "react";
import styles from "@/components/Layout/Header/Header.module.css";
import Logo from "@/components/Logo/Logo";
import MainMenu from "@/components/Layout/Header/Navigation/MainMenu";
import SubMenu from "@/components/Layout/Header/Navigation/SubMenu";
import AccountMenu from "@/components/Layout/Header/Navigation/AccountMenu";
import { useMenu } from "@/context/menu/MenuContext";

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const {
    selectedMainMenu,
    selectedSubMenu,
    changeMainMenu,
    changeSubMenu,
  } = useMenu();

  return (
    <>
      <header>
        <div className={styles["header-inner"]} ref={navRef}>
          <Logo />
          <MainMenu
            selectedMainMenu={selectedMainMenu}
            onMainMenuChange={changeMainMenu}
          />
          <AccountMenu />
        </div>
      </header>
      <SubMenu
        selectedMainMenu={selectedMainMenu}
        selectedSubMenu={selectedSubMenu}
        onSubMenuChange={changeSubMenu}
      />
    </>
  );
}