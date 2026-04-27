import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { menuMap } from "@/constants/menu";
import mockProducts from "@/data/wedding/product/mockProducts.json";
import type { UrlSegments } from "@/router/AppRouterInterface";
import styles from "@/pages/Product/ProductListPage.module.css";
import CategoryTabs from "@/components/common/CategoryTabs";

interface Product {
  id: number;
  title: string;
  price: number;
  img: string;
  rating: number;
  reviewCount: number;
}

export default function ProductListPage({ main, sub, child }: UrlSegments) {
  const navigate = useNavigate();

  const mainMenuKey = main as keyof typeof menuMap;
  const menu = menuMap[mainMenuKey]!;

  const currentSubMenu = menu.subMenus.find(
    (m): m is typeof m & { children: readonly any[] } =>
      m.menuKey === sub && "children" in m
  )!;

  const currentChild = currentSubMenu.children.find(
    (c) => c.path.endsWith(child!)
  )!;

  const products: Product[] =
    (mockProducts[currentChild.id as keyof typeof mockProducts] as Product[]) || [];

  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");

  const handleSearch = () => {
    // 검색 로직
  };

  return (
    <div className="contentsContainer">
      <div className={styles.mobileMenu}>
        <CategoryTabs
          items={currentSubMenu.children.map((child) => ({
            id: child.id,
            label: child.label,
            path: child.path,
          }))}
          selectedId={currentChild.id}
          onClick={(item) => navigate(item.path!)}
        />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          {currentSubMenu.children.map((child) => (
            <div
              key={child.id}
              className={
                currentChild.id === child.id
                  ? styles.activeChild
                  : styles.childItem
              }
              onClick={() => navigate(child.path)}
            >
              {child.label}
            </div>
          ))}
        </aside>

        <div className={styles.main}>
          <div className={styles.topBar}>
            <div className={["inputWrapper", styles.searchWrapper].join(" ")}>
              <input
                placeholder="상품 검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className={styles.searchBtn} onClick={handleSearch}>
                <i className="fas fa-search"></i>
              </button>
            </div>

            <div className={styles.selectBox}>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
                <option value="low">가격 낮은순</option>
                <option value="high">가격 높은순</option>
              </select>
            </div>
          </div>

          <div className="gridPc3Mobile2">
            {products.length === 0 ? (
              <p>상품이 없습니다.</p>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="card"
                  onClick={() => navigate(`${currentChild.path}?id=${product.id}`)
                  }                >
                  <div className="coverImage">
                    <img src={product.img} alt={product.title} />
                  </div>

                  <div className="meta">
                    <div className="productTitle">{product.title}</div>
                    <div className="highlightBold">{product.price.toLocaleString()}</div>
                    <div className="reviewCount">
                      <span className="highlightPrimary">평점 {product.rating}</span>
                      <span>리뷰 {product.reviewCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}