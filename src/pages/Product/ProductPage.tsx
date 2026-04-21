import { useNavigate, useLocation } from "react-router-dom";
import { menuMap } from "@/constants/menu";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuKey = location.pathname.split("/")[1] as keyof typeof menuMap;
  const menu = menuMap[mainMenuKey];

  /**
   * 🔥 핵심: children 있는 subMenu만 찾기 + 가장 구체적인 경로 선택
   */
  const currentSubMenu = [...menu.subMenus]
    .filter(
      (sub): sub is typeof sub & {
        children: readonly { id: string; label: string; path: string }[];
      } => "children" in sub
    )
    .sort((a, b) => b.path.length - a.path.length)
    .find((sub) => location.pathname.startsWith(sub.path));

  /**
   * 🔥 현재 child 찾기 (타입 안전)
   */
  const currentChild = currentSubMenu?.children.find((child) =>
    location.pathname.startsWith(child.path)
  );

  return (
    <div className={styles.container}>
      {/* 🔥 모바일: 상단 subMenu */}
      <div className={styles.mobileMenu}>
        {menu.subMenus.map((sub) => (
          <button
            key={sub.menuKey}
            className={
              currentSubMenu?.menuKey === sub.menuKey
                ? styles.active
                : ""
            }
            onClick={() => navigate(sub.path)}
          >
            {sub.label}
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        {/* 🔥 PC 사이드바 (children ONLY) */}
        <aside className={styles.sidebar}>
          {currentSubMenu?.children.map((child) => (
            <div
              key={child.id}
              className={
                currentChild?.id === child.id
                  ? styles.activeChild
                  : styles.childItem
              }
              onClick={() => navigate(child.path)}
            >
              {child.label}
            </div>
          ))}
        </aside>

        {/* 🔥 메인 */}
        <main className={styles.main}>
          <div className={styles.topBar}>
            <input placeholder="상품 검색" />

            <select>
              <option>최신순</option>
              <option>인기순</option>
              <option>가격 낮은순</option>
              <option>가격 높은순</option>
            </select>
          </div>

          <div className={styles.productGrid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.card}>
                <img src="/images/sample.jpg" alt="상품" />
                <div className={styles.info}>
                  <h4>상품 {i + 1}</h4>
                  <p>₩100,000</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}