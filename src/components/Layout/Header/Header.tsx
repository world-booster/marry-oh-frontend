import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
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

  const [hoverMainMenu, setHoverMainMenu] = useState<MainMenuKey | undefined>();
  const [hoverSubMenu, setHoverSubMenu] = useState<SubMenuKey | undefined>();

  /* 🔥 핵심: URL 바뀌면 hover 초기화 */
  useEffect(() => {
    setHoverMainMenu(undefined);
    setHoverSubMenu(undefined);
  }, [pathname]);

  const selectedMainMenu = urlMain;

  /* hover 중이면 active 제거 */
  const selectedSubMenu = hoverMainMenu ? undefined : urlSub;

  const displayMainMenu = hoverMainMenu ?? selectedMainMenu;

  return (
    <div
      className={styles.headerWrapper}
      onMouseLeave={() => {
        setHoverMainMenu(undefined);
        setHoverSubMenu(undefined);
      }}
    >
      <header>
        <div className={styles.headInner} ref={navRef}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>

          <MainMenu
            selectedMainMenu={selectedMainMenu}
            hoverMenu={hoverMainMenu}
            onHover={(menuKey) => {
              if (menuKey === urlMain) {
                setHoverMainMenu(undefined);
                return;
              }

              setHoverMainMenu(menuKey);
              setHoverSubMenu(undefined);
            }}
          />

          <AccountMenu />
        </div>
      </header>

      <SubMenu
        selectedMainMenu={displayMainMenu}
        selectedSubMenu={selectedSubMenu}
        onHover={setHoverSubMenu}
        hoverMenu={hoverSubMenu}
      />
    </div>
  );
}