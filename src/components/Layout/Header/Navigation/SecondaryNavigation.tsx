import styles from "../Header.module.css";
import type { MainMenuKey, SubMenuKey } from "../Header";
import MenuList from "./MenuList";

interface SecondaryNavigationProps {
  selectedMainMenu: MainMenuKey;
  onSubMenuChange: (menuKey: SubMenuKey) => void;
}

const secondaryMenuMap:
  Record<MainMenuKey, { label: string, menuKey: SubMenuKey }[]> =
{
  wedding: [
    { label: "드레스", menuKey: "dress" },
    { label: "부케", menuKey: "suit" },
    { label: "식장", menuKey: "hall" },
    { label: "청첩장", menuKey: "invite" },
  ],
  rental: [
    { label: "실내", menuKey: "outside" },
    { label: "야외", menuKey: "inside" },
  ],
  community: [
    { label: "공지사항", menuKey: "notice" },
    { label: "자유게시판", menuKey: "free" },
    { label: "결혼식구경하기", menuKey: "ceremony" },
    { label: "정보공유", menuKey: "info" },
  ]
}

export default function SecondaryNavigation({
  selectedMainMenu,
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
        onItemClick={(subMenuKey) => { if (subMenuKey) onSubMenuChange(subMenuKey) }}
      />
    </nav>

  );
}