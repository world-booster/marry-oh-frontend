import { useNavigate } from "react-router-dom";
import type { MainMenuKey, SubMenuKey } from "@/constants/menu";
import { menuMap } from "@/constants/menu";
import styles from "@/components/Layout/Header/Header.module.css";
import MenuList from "@/components/Layout/Header/Navigation/MenuList";

interface SubMenuProps {
  selectedMainMenu: MainMenuKey;
  selectedSubMenu: SubMenuKey;
}

export default function SubMenu({
  selectedMainMenu,
  selectedSubMenu
}: SubMenuProps) {

  const navigate = useNavigate();
  const subMenuItems = menuMap[selectedMainMenu].subMenus;

  const handleClick = (subMenuKey: SubMenuKey) => {
    const item = subMenuItems.find(
      (menu) => menu.menuKey === subMenuKey
    );

    if (!item) return;

    navigate(item.path);
  };

  return (
    <nav
      className={styles["secondary-nav-wrapper"]}
      onClick={(e) => e.stopPropagation()}
    >
      <MenuList
        className={styles["secondary-nav"]}
        items={subMenuItems}
        selectedMenu={selectedSubMenu}
        onItemClick={handleClick}
      />
    </nav>
  );
}