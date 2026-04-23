import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
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

  const urlMain = (main ?? "wedding") as MainMenuKey;
  const urlSub = (sub ?? "home") as SubMenuKey;

  /* Hover 상태 관리 */
  const [hoverMainMenu, setHoverMainMenu] = useState<MainMenuKey | undefined>(undefined);
  const selectedMainMenu = hoverMainMenu ?? urlMain;
  const [hoverSubMenu, setHoverSubMenu] = useState<SubMenuKey | undefined>(undefined);
  const selectedSubMenu = hoverMainMenu ? undefined : urlSub;

  return (
    <div className={styles.headerWrapper}
      onMouseLeave={() => {
        setHoverMainMenu(undefined);
        setHoverSubMenu?.(undefined);
      }}
    >
      <header>
        <div className={styles.headInner} ref={navRef}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>

          <MainMenu
            selectedMainMenu={selectedMainMenu}
            hoverMenu={hoverMainMenu ?? undefined}
            onHover={(menuKey) => {
              if (menuKey === urlMain) {
                setHoverMainMenu(undefined);
                return;
              }
              setHoverMainMenu(menuKey);
            }}
          />
          <AccountMenu />
        </div>
      </header>

      <SubMenu
        selectedMainMenu={selectedMainMenu}
        selectedSubMenu={selectedSubMenu}
        onHover={setHoverSubMenu}
        hoverMenu={hoverSubMenu}
      />
    </div>
  );
}