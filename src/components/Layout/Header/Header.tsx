import { useState, useRef } from "react";
import styles from "./Header.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation/Navigation";
import SecondaryNavigation from "./Navigation/SecondaryNavigation";
import AccoutPanel from "./Navigation/AccountPanel";


export type MainMenuKey = "wedding" | "rental" | "community";
export type SubMenuKey =
  /*wedding*/    "dress" | "suit" | "bouquet" | "snapshot" | "invite" | "items" |
  /*rental*/     "studio" | "outside" | "weddingcar" |
  /*community*/  "notice" | "board" | "ceremony" | "info";

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
            selectedMainMenu={selectedMainMenu}
            onMainMenuChange={handleMainMenuChange}
          />
          <AccoutPanel />
        </div>
      </header>
      <SecondaryNavigation
        selectedMainMenu={selectedMainMenu}
        selectedSubMenu={selectedSubMenu}
        onSubMenuChange={handleSubMenuChange}
      />
    </>
  );
}