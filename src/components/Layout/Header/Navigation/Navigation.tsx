import type { MainMenuKey } from "../Header";
import styles from "../Header.module.css";
import MenuList from "./MenuList";

interface NavigationProps {
  selectedMainMenu: MainMenuKey;
  onMainMenuChange: (menu: MainMenuKey) => void;
}

const menuItems: { label: string; menuKey: MainMenuKey }[] = [
  { label: "셀프웨딩", menuKey: "wedding" },
  { label: "대여", menuKey: "rental" },
  { label: "커뮤니티", menuKey: "community" },
];

export default function Navigation({
  selectedMainMenu,
  onMainMenuChange
}: NavigationProps) {

  return (
    <nav
      className={`${styles.nav}`}
      onClick={(e) => e.stopPropagation()}
    >
      <MenuList<MainMenuKey>
        className={styles["menu-container"]}
        items={menuItems}
        selectedMenu={selectedMainMenu}
        onItemClick={(menuKey) => { if (menuKey) onMainMenuChange(menuKey) }}
      />
    </nav>
  );
}

