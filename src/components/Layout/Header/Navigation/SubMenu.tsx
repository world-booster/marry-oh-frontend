import { useNavigate } from "react-router-dom";
import type { MainMenuKey, SubMenuKey } from "@/constants/menu";
import { menuMap } from "@/constants/menu";
import styles from "@/components/Layout/Header/Header.module.css";
import MenuList from "@/components/Layout/Header/Navigation/MenuList";

interface SubMenuProps {
  selectedMainMenu: MainMenuKey;
  selectedSubMenu?: SubMenuKey;
  hoverMenu?: SubMenuKey;
  onHover?: (menuKey: SubMenuKey) => void;
}

export default function SubMenu({
  selectedMainMenu,
  selectedSubMenu,
  hoverMenu,
  onHover
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
      className={styles.subMenuWrapper}
      onClick={(e) => e.stopPropagation()}
    >
      <MenuList<SubMenuKey>
        className={styles.subMenuNav}
        items={subMenuItems}
        selectedMenu={selectedSubMenu}
        onItemClick={handleClick}
        hoverMenu={hoverMenu}
        onItemHover ={onHover}
      />
    </nav>
  );
}