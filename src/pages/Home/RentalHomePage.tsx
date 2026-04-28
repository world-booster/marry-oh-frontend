import { useState } from "react";
import "@/assets/styles/global.css";
import { menuMap } from "@/constants/menu";
import styles from "@/pages/Home/RentalHomapage.module.css";
import bannerData from "@/data/wedding/home/mockBanner.json";
import bestProducts from "@/data/rental/home/mockRentalBestProduct.json";
import studioReview from "@/data/rental/home/mockRentalStudioReview.json";
import hallReview from "@/data/rental/home/mockRentalHallReview.json";
import CategoryTabs from "@/components/common/CategoryTabs";


export default function RentalHomePage() {
  const banner = bannerData.banners[1];

  /* 베스트 카테고리 */
  const categories = menuMap.rental.subMenus.filter((sub) => sub.menuKey !== "home");
  const defaultCategory = categories[0]?.menuKey ?? "";
  const [selectedBestCategory, setSelectedBestCategory] = useState<string>(defaultCategory);
  const filteredProducts = bestProducts[selectedBestCategory as keyof typeof bestProducts] || [];



  return (
    <div className="globalContainer">
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
        <CategoryTabs
          items={categories.map((menu) => ({
            id: menu.menuKey,
            label: menu.label,
          }))}
          selectedId={selectedBestCategory}
          onClick={(item) => setSelectedBestCategory(item.id)}
        />


        <div className="gridPc3Mobile3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              <div className="coverImage">
                <img src={product.img} alt={product.title} />
              </div>
              <div className="meta">
                <span className="vendor">{product.vendor}</span>
                <div className="productTitle">{product.title}</div>
                <div className="highlightBold">{product.price.toLocaleString()}</div>
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