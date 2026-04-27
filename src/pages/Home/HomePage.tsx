import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/assets/styles/global.css";
import { menuMap, getCategoryPath } from "@/constants/menu";
import styles from "@/pages/Home/Homapage.module.css";
import bannerData from "@/data/wedding/home/mockBanner.json";
import bestProducts from "@/data/wedding/home/mockBestProducts.json";
import popularWeddings from "@/data/wedding/home/mockPopularWedding.json";
import weddingTips from "@/data/wedding/home/mockWeddingTips.json";
import CategoryTabs from "@/components/common/CategoryTabs";

export default function HomePage() {
  const navigate = useNavigate();
  const banner = bannerData.banners[0];

  /* 베스트 카테고리 */
  const defaultCategory = menuMap.wedding.subMenus.find(sub => "children" in sub)?.children?.[0]?.id ?? "";
  const [selectedBestCategory, setSelectedBestCategory] = useState<string>(defaultCategory);
  const categories = menuMap.wedding.subMenus.flatMap(sub => "children" in sub ? [...sub.children] : []);
  const filteredProducts = bestProducts[selectedBestCategory as keyof typeof bestProducts] || [];

  return (
    <div className="contentsContainer">
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
        <div className="gridPc4Mobile2">
          {popularWeddings.map((item) => (
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


      {/* WEDDING TIPS*/}
      <section>
        <h2>결혼식 꿀팁</h2>
        <div className="gridPc3Mobile1 overflowVisible">
          {weddingTips.map((item) => (
            <div key={item.id} className="card textOnly ">
              <div className="highlightBold contentTitle">{item.title}</div>
              <div className="meta">
                <div className="content">{item.content}</div>
                <span className="nickname">{item.nickname}</span>
                <div className="reviewCount">
                  <span>조회수 {item.viewCount.toLocaleString()}</span>
                  <span>댓글 {item.replyCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* BEST PRODUCTS */}
      <section>
        <h2>베스트</h2>
        <CategoryTabs
          items={categories.map((menu) => ({
            id: menu.id,
            label: menu.label,
          }))}
          selectedId={selectedBestCategory}
          onClick={(item) => setSelectedBestCategory(item.id)}
        />


        <div className="gridPc3Mobile3">
          {filteredProducts.map((product) => (
            <div key={product.id}
              className="card"
              onClick={() => {
                const path = getCategoryPath(selectedBestCategory);
                if (!path) return;
                navigate(`${path}?id=${product.id}`);
              }}
            >
              <div className="coverImage">
                <img src={product.img} alt={product.title} />
              </div>
              <div className="meta">
                <span className="vendor">{product.vendor}</span>
                <div className="productTitle">{product.title}</div>
                <div className="highlightBold">{product.price.toLocaleString()}</div>
                <div className="reviewCount">
                  <span className="rating">평점 {product.rating}</span>
                  <span>리뷰 {product.reviewCount.toLocaleString()}
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