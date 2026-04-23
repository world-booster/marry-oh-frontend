import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuMap } from "@/constants/menu";
import "@/assets/styles/global.css";
import styles from "./ProductPage.module.css";

/* 🔥 mock 데이터 (서버 대신) */
const mockProducts: Record<
  string,
  { id: number; title: string; price: number; img: string }[]
> = {
  "101010000000": [
    {
      id: 1,
      title: "프리미엄 웨딩 드레스",
      price: 1200000,
      img: "/images/home/best-product/dress1.jpg",
    },
    {
      id: 2,
      title: "레이스 머메이드 드레스",
      price: 950000,
      img: "/images/home/best-product/dress2.jpg",
    },
  ],

  "101040000000": [
    {
      id: 10,
      title: "생화 부케",
      price: 150000,
      img: "/images/home/best-product/flower1.jpg",
    },
    {
      id: 11,
      title: "프리미엄 플라워 세트",
      price: 300000,
      img: "/images/home/best-product/flower2.jpg",
    },
  ],
};

interface Product {
  id: number;
  title: string;
  price: number;
  img: string;
}

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const mainMenuKey = location.pathname.split("/")[1] as keyof typeof menuMap;
  const menu = menuMap[mainMenuKey];

  /* 🔥 현재 서브메뉴 찾기 */
  const currentSubMenu = [...menu.subMenus]
    .filter(
      (sub): sub is typeof sub & {
        children: readonly { id: string; label: string; path: string }[];
      } => "children" in sub
    )
    .sort((a, b) => b.path.length - a.path.length)
    .find((sub) => location.pathname.startsWith(sub.path));

  const currentChild = currentSubMenu?.children.find(
    (child) => location.pathname === child.path
  );

  const categoryId = currentChild?.id;

  useEffect(() => {
    if (!currentSubMenu) return;
    if (!currentChild && currentSubMenu.children.length > 0) {
      navigate(currentSubMenu.children[0].path, { replace: true });
    }
  }, [currentSubMenu, currentChild, navigate]);


  useEffect(() => {
    if (!categoryId) return;

    const data = mockProducts[categoryId] || [];
    setProducts(data);
  }, [categoryId]);




  return (
    <div className="contentsContainer">
      {/* 🔥 모바일 메뉴 */}
      <div className={styles.mobileMenu}>
        {currentSubMenu?.children.map((child) => (
          <button
            key={child.id}
            className={
              currentChild?.id === child.id
                ? styles.active
                : ""
            }
            onClick={() => navigate(child.path)}
          >
            {child.label}
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        {/* 🔥 사이드바 */}
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
          {/* 🔥 상단바 */}
          <div className={styles.topBar}>
            <input placeholder="상품 검색" />

            <select>
              <option>최신순</option>
              <option>인기순</option>
              <option>가격 낮은순</option>
              <option>가격 높은순</option>
            </select>
          </div>

          {/* 🔥 상품 리스트 */}
          <div className={styles.productGrid}>
            {products.length === 0 ? (
              <p>상품이 없습니다.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className={styles.card}>
                  <img src={product.img} alt={product.title} />
                  <div className={styles.info}>
                    <h4>{product.title}</h4>
                    <p>₩{product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}