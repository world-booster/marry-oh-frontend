import { useState } from "react";
import "@/assets/styles/global.css";
import { menuMap } from "@/constants/menu";
import styles from "@/pages/Home/RentalHomapage.module.css";
import bannerData from "@/data/wedding/mockBanner.json";
import bestProducts from "@/data/rental/mockRentalBestProduct.json";
import studioReview from "@/data/rental/mockRentalStudioReview.json";
import hallReview from "@/data/rental/mockRentalHallReview.json";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";


export default function RentalHomePage() {
  const banner = bannerData.banners[1];

  /* 베스트 카테고리 */
  const categories = menuMap.rental.subMenus.filter((sub) => sub.menuKey !== "home");
  const defaultCategory = categories[0]?.menuKey ?? "";
  const [selectedBestCategory, setSelectedBestCategory] = useState<string>(defaultCategory);
  const filteredProducts = bestProducts[selectedBestCategory as keyof typeof bestProducts] || [];

  /* 베스트 카테고리 PC버전 가로 이동 화살표 */
  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scroll,
  } = useHorizontalScroll([categories]);




  return (
    <div className="contentsContainer">
      {/* HERO */}
      <section className={styles.hero} style={{ backgroundImage: `url(${banner.imageUrl})` }}>
        {/* <section className={styles.hero}> */}
        <h1>{banner.title}</h1>
        <p>{banner.description}</p>
      </section>


      {/* STUDIO REVIEW */}
      <section>
        <h2>스튜디오 촬영후기</h2>
        <div className="gridPc3Mobile3">
          {studioReview.map((item) => (
            <div key={item.id} className="card">
              <div className="coverImage">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="meta">
                <span className="nickname"> {item.nickname} </span>
                <div className="productTitle">{item.title}</div>
                <div className="reviewCount">
                  <span>조회수 {item.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section>
        <h2>예식장 후기</h2>
        <div className="gridPc4Mobile2">
          {hallReview.map((item) => (
            <div key={item.id} className="card">
              <div className="coverImage">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="meta">
                <span className="nickname"> {item.nickname} </span>
                <div className="productTitle">{item.title}</div>
                <div className="reviewCount">
                  <span>조회수 {item.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section>
        <h2>베스트</h2>
        <div className="categoryWrapper">
          {canScrollLeft && (
            <button className="arrow" onClick={() => scroll("left")}>
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          <div ref={scrollRef} className="categoryTabs">
            {categories.map((menu) => (
              <button
                key={menu.menuKey}
                className={selectedBestCategory === menu.menuKey ? "active" : ""}
                onClick={() => setSelectedBestCategory(menu.menuKey)}
              >
                {menu.label}
              </button>
            ))}
          </div>
          {canScrollRight && (
            <button className="arrow" onClick={() => scroll("right")}>
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>


        <div className="gridPc3Mobile3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              <div className="coverImage">
                <img src={product.img} alt={product.title} />
              </div>
              <div className="meta">
                <span className="vendor">{product.vendor}</span>
                <div className="productTitle">{product.title}</div>
                <div className="highlight">{product.price.toLocaleString()}</div>
                <div className="reviewCount">
                  <span>평점 {product.rating}</span>
                  <span>리뷰 {product.reviewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}