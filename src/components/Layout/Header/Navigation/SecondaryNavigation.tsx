import styles from "../Header.module.css";
import type { MainMenuKey } from "../Header";
import MenuList from "./MenuList";

interface SecondaryNavigationProps {
  selectedMenu: MainMenuKey;
  onItemClick?: () => void;
}

const secondaryMenuMap:
  Record<MainMenuKey, { label: string, href: string }[]> =
{
  wedding: [
    { label: "드레스", href: "#" },
    { label: "부케", href: "#" },
    { label: "식장", href: "#" },
    { label: "청첩장", href: "#" },
  ],
  hall: [
    { label: "실내", href: "#" },
    { label: "야외", href: "#" },
  ],
  community: [
    { label: "공지사항", href: "#" },
    { label: "자유게시판", href: "#" },
    { label: "결혼식구경하기", href: "#" },
    { label: "정보공유", href: "#" },
  ]
}

export default function SecondaryNavigation(
  { selectedMenu, onItemClick }: SecondaryNavigationProps) {

  const items = secondaryMenuMap[selectedMenu] ?? [];

  return (
    <div className={styles["secondary-nav-wrapper"]}>
      <MenuList items={items}
        className={styles["secondary-nav"]}
        onItemClick={onItemClick}
      />
    </div>

  );
}