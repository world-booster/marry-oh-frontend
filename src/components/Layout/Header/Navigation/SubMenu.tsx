import type { MainMenuKey, SubMenuKey } from "@/constants/menu";
import { secondaryMenuMap } from "@/constants/menu";
import styles from "@/components/Layout/Header/Header.module.css";
import MenuList from "@/components/Layout/Header/Navigation/MenuList";

interface SecondaryNavigationProps {
  selectedMainMenu: MainMenuKey;
  selectedSubMenu: SubMenuKey;
  onSubMenuChange: (menuKey: SubMenuKey) => void;
}

export default function SecondaryNavigation({
  selectedMainMenu,
  selectedSubMenu,
  onSubMenuChange
}: SecondaryNavigationProps) {
  const subMenuItems: { label: string; menuKey: SubMenuKey }[] = secondaryMenuMap[selectedMainMenu] ?? [];

  return (
    <nav
      className={styles["secondary-nav-wrapper"]}
      onClick={(e) => e.stopPropagation()}
    >
      <MenuList<SubMenuKey>
        className={styles["secondary-nav"]}
        items={subMenuItems}
        selectedMenu={selectedSubMenu}
        onItemClick={(subMenuKey) => { if (subMenuKey) onSubMenuChange(subMenuKey) }}
      />
    </nav>

  );
}