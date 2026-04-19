import { useState } from "react";
import "@/assets/styles/global.css";
import { menuMap } from "@/constants/menu";
import styles from "@/pages/Home/Homapage.module.css";
import bannerData from "@/data/mockBanner.json";
import bestProducts from "@/data/mockBestProducts.json";
import popularWeddings from "@/data/mockPopularWedding.json";
import weddingTips from "@/data/mockWeddingTips.json";

export default function HomePage() {
  const banner = bannerData.banners[0];

  /* 베스트 카테고리 */
  const [selectedBestCategory, setSelectedBestCategory] = useState<string>("dress");
  const categories = menuMap.wedding.subMenus.filter((menu) => menu.menuKey !== "home");
  const filteredProducts =
    bestProducts[selectedBestCategory as keyof typeof bestProducts] || [];

  return (
    <div className="contents-container">
      {/* HERO */}
      {/*<section className={styles.hero} style={{ backgroundImage: `url(${banner.imageUrl})` }}> */}
      <section className={styles.hero}>
        <h1>{banner.title}</h1>
        <p>{banner.description}</p>
        <button>지금 시작하기</button>
      </section>







      {/* POPULAR WEDDINGS */}
      <section>
        <h2>인기 웨딩 구경하기</h2>
        <div className={styles.popularList}>
          {popularWeddings.map((item) => (
            <div key={item.id} className={styles.card}>
              {/* 이미지 */}
              <div className={styles["cover-image"]}>
                <img src={item.img} alt={item.title} className={styles.image} />
              </div>
              {/* 정보 */}
              <div className={styles["meta"]}>
                <span className={styles["sub-title"]}> {item.nickname} </span>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.review}>
                  <span className={styles.count}>조회수 {item.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>





      {/* WEDDING TIPS*/}
      <section>
        <h2>결혼식 꿀팁</h2>
        <div className={styles.weddingTipList}>
          {weddingTips.map((item) => (
            /*<div key={item.id} className={styles.card}>*/
            <div key={item.id} className={`${styles.card} ${styles["weddingtip-card"]}`}>
              <div className={`${styles.highlight} ${styles["content-title"]}`}>{item.title}</div>
              <div className={styles["meta"]}>
                <div className={styles.content}>{item.content}</div>
                <span className={styles["sub-title"]}>{item.nickname}</span>
                <div className={styles.review}>
                  <span className={styles.count}>조회수 {item.viewCount.toLocaleString()}</span>
                  <span className={styles.count}>댓글 {item.replyCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* BEST PRODUCTS */}
      <section className={styles.products}>
        <h2>베스트</h2>
        {/* 카테고리 */}
        <div>
          {categories.map((menu) => (
            <button
              key={menu.menuKey}
              className={selectedBestCategory === menu.menuKey ? styles.active : ""}
              onClick={() => setSelectedBestCategory(menu.menuKey)}
            >{menu.label}
            </button>
          ))}
        </div>

        {/* 상품 리스트 */}
        <div className={styles.productList}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles["cover-image"]}>
                <img src={product.img} alt={product.title} className={styles.image} />
              </div>
              <div className={styles["meta"]}>
                <span className={styles["sub-title"]}>{product.vendor}</span>
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