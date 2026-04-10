import { useState, useRef } from "react";
import styles from "./Header.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation/Navigation";
import SecondaryNavigation from "./Navigation/SecondaryNavigation";
import AccoutPanel from "./Navigation/AccountPanel";


export type MainMenuKey = "wedding" | "rental" | "community";
export type SubMenuKey =
  "dress" | "invite" | "hall" | "suit" |
  "outside" | "inside" |
  "notice" | "free" | "info" | "ceremony";

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [selectedMainMenu, setSelectedMainMenu] = useState<MainMenuKey>("wedding");
  const handleMainMenuChange = (menu: MainMenuKey) => {
    setSelectedMainMenu(menu);
  };

  const [selectedSubMenu, setSelectedSubMenu] = useState<SubMenuKey>("dress");
  const handleSubMenuChange = (menu: SubMenuKey) => {
    setSelectedSubMenu(menu);
  };

  return (
    <>
      <header>
        <div className={styles["header-inner"]} ref={navRef}>
          <Logo />
          <Navigation
            onMainMenuChange={handleMainMenuChange}
          />
          <AccoutPanel />
        </div>
      </header>
      <SecondaryNavigation
        selectedMainMenu={selectedMainMenu}
        onSubMenuChange={handleSubMenuChange}
      />
    </>
  );
}