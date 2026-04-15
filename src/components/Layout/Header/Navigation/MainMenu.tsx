import type { MainMenuKey } from "@/constants/menu";
import styles from "@/components/Layout/Header/Header.module.css";
import MenuList from "@/components/Layout/Header/Navigation/MenuList";
import { menuItems } from "@/constants/menu";

interface NavigationProps {
  selectedMainMenu: MainMenuKey;
  onMainMenuChange: (menu: MainMenuKey) => void;
}

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



