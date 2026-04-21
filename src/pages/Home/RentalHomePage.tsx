import { useState, useRef, useLayoutEffect } from "react";
import "@/assets/styles/global.css";
import { menuMap } from "@/constants/menu";
import styles from "@/pages/Home/RentalHomapage.module.css";
import bannerData from "@/data/wedding/mockBanner.json";
import bestProducts from "@/data/wedding/mockBestProducts.json";
import studioReview from "@/data/rental/mockRentalHomeStudioReview.json";
import hallReview from "@/data/rental/mockRentalHomeHallReview.json";

export default function RentalHomePage() {
  const banner = bannerData.banners[1];

  /* 베스트 카테고리 */
  const categories = menuMap.rental.subMenus.filter((sub) => sub.menuKey !== "home");
  const defaultCategory = categories[0]?.menuKey ?? "";
  const [selectedBestCategory, setSelectedBestCategory] = useState<string>(defaultCategory);
  const filteredProducts = bestProducts[selectedBestCategory as keyof typeof bestProducts] || [];

  /* 베스트 카테고리 PC버전 가로 이동 화살표 */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useLayoutEffect(() => {
    checkScroll();
  }, [categories]);

  const scrollCategory = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };



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
        <div className={styles.CardGridPc3Mobile3}>
          {studioReview.map((item) => (
            <div key={item.id} className={styles.card}>
              {/* 이미지 */}
              <div className={styles.coverImage}>
                <img src={item.img} alt={item.title} className={styles.image} />
              </div>
              {/* 정보 */}
              <div className={styles.meta}>
                <span className={styles.subTitle}> {item.nickname} </span>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.review}>
                  <span className={styles.count}>조회수 {item.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* WEDDINGHALL REVIEW */}
      <section>
        <h2>예식장 후기</h2>
        <div className={styles.CardGridPc4Mobile2}>
          {hallReview.map((item) => (
            <div key={item.id} className={styles.card}>
              {/* 이미지 */}
              <div className={styles.coverImage}>
                <img src={item.img} alt={item.title} className={styles.image} />
              </div>
              {/* 정보 */}
              <div className={styles.meta}>
                <span className={styles.subTitle}> {item.nickname} </span>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.review}>
                  <span className={styles.count}>조회수 {item.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>




      {/* BEST PRODUCTS */}
      <section className={styles.products}>
        <h2>베스트</h2>
        <div className={styles.categoryWrapper}>
          {/* 왼쪽 버튼 */}
          {canScrollLeft && (
            <button className={styles.arrow} onClick={() => scrollCategory("left")}>
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          {/* 기존 코드 그대로 + ref만 추가 */}
          <div ref={scrollRef} className={styles.categoryRow} onScroll={checkScroll}>
            {categories.map((menu) => (
              <button
                key={menu.menuKey}
                className={selectedBestCategory === menu.menuKey ? styles.active : ""}
                onClick={() => setSelectedBestCategory(menu.menuKey)}
              >
                {menu.label}
              </button>
            ))}
          </div>

          {/* 오른쪽 버튼 */}
          {canScrollRight && (
            <button className={styles.arrow} onClick={() => scrollCategory("right")}>
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>


        {/* 상품 리스트 */}
        <div className={styles.CardGrid3Columns}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.coverImage}>
                <img src={product.img} alt={product.title} className={styles.image} />
              </div>
              <div className={styles.meta}>
                <span className={styles.subTitle}>{product.vendor}</span>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.highlight}>{product.price.toLocaleString()}</div>
                <div className={styles.review}>
                  <span className={styles.rating}>
                    평점 {product.rating}
                  </span>
                  <span className={styles.count}>
                    리뷰 {product.reviewCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}