import { useEffect, useRef, useState } from "react";
import styles from "@/pages/Product/ProductDetailPage.module.css";
import detail from "@/data/wedding/product/mockProductDetail.json";

interface QnaItem {
    id: string;
    question: string;
    answer: string;
    user: string;
    date: string;
}
interface ReviewItem {
    id: string;
    user: string;
    profileImage: string | null;
    rating: number;
    content: string;
    createdAt: string;
    image: string | null;
}

interface ProductDetail {
    id: string;
    title: string;
    vendor: string;
    originalPrice: number;
    finalPrice: number;
    discountRate: number;
    thumbnails: string[];
    detailImages: string[];
    description: string;
    rating: number;
    reviewCount: number;
    qna: QnaItem[];
    reviews: ReviewItem[];
}

interface Props {
    id: string;
}

export default function ProductDetailPage({ id }: Props) {

    /* 🔥 상태 */
    const [tab, setTab] = useState<"detail" | "review" | "qna" | "shipping">("detail");
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    /* 🔥 펼침 관련 */
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);

    /* 🔥 refs */
    const detailRef = useRef<HTMLDivElement>(null);
    const qnaRef = useRef<HTMLDivElement>(null);
    const shippingRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);
    const detailContentRef = useRef<HTMLDivElement>(null);

    const [sort, setSort] = useState<"latest" | "rating">("latest");
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const start = (page - 1) * pageSize;



    /* 🔥 데이터 로딩 */
    useEffect(() => {
        if (!id) return;

        const data = detail[id as keyof typeof detail];
        setProduct(data ?? null);
        setSelectedImage(0);
    }, [id]);

    /* 🔥 높이 체크 */
    useEffect(() => {
        if (!detailContentRef.current) return;

        const checkHeight = () => {
            const height = detailContentRef.current!.scrollHeight;
            setIsOverflow(height > 900);
        };

        checkHeight(); // 초기 실행
        const images = detailContentRef.current.querySelectorAll("img");
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener("load", checkHeight);
            }
        });
        return () => {
            images.forEach(img => {
                img.removeEventListener("load", checkHeight);
            });
        };
    }, [product]);

    const handleTabClick = (
        key: typeof tab,
        ref: React.RefObject<HTMLDivElement | null>
    ) => {
        setTab(key);
        ref.current?.scrollIntoView({
            behavior: "auto",
            block: "start",
        });
    };

    if (!product) return <div>상품을 찾을 수 없습니다.</div>;

    const thumbnails = product.thumbnails;
    const currentReviews = product.reviews.slice(start, start + pageSize);
    const totalPage = Math.ceil(product.reviews.length / pageSize);

    return (
        <div className="contentsContainer">
            <div className={styles.layout}>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageSection}>
                        <div className={styles.thumbnailList}>
                            {thumbnails.map((img, idx) => (
                                <img key={idx}
                                    src={img}
                                    className={idx === selectedImage ? styles.thumbnailActive : styles.thumbnail}
                                    onClick={() => setSelectedImage(idx)}
                                />
                            ))}
                        </div>
                        <div className={styles.mainImage}>
                            <img src={thumbnails[selectedImage] ?? thumbnails[0]} alt={product.title} />
                        </div>
                    </div>
                </div>
                <div className={styles.detailWrapper}>
                    <div className={styles.tabs}>
                        <button onClick={() => handleTabClick("detail", detailRef)} className={tab === "detail" ? styles.active : ""}>상품정보</button>
                        <button onClick={() => handleTabClick("review", reviewRef)} className={tab === "review" ? styles.active : ""}>리뷰</button>
                        <button onClick={() => handleTabClick("shipping", shippingRef)} className={tab === "shipping" ? styles.active : ""}>배송/환불</button>
                        <button onClick={() => handleTabClick("qna", qnaRef)} className={tab === "qna" ? styles.active : ""}>문의</button>
                    </div>

                    <div className={styles.content}>
                        <div ref={detailRef} className={styles.section}>
                            <div className={styles.sectionTitle}>상품정보</div>
                            <div ref={detailContentRef}
                                className={`${styles.detailContent} ${!isExpanded ? styles.collapsed : ""}`}
                            >
                                {product.detailImages.map((img, idx) => (
                                    <img key={idx} src={img} className={styles.detailImage} />
                                ))}
                                <p>{product.description}</p>
                            </div>

                            {isOverflow && (
                                <div className={styles.expandBox}>
                                    <button className={styles.expandBtn}
                                        onClick={() => {
                                            setIsExpanded(v => !v);
                                            if (isExpanded) {
                                                detailRef.current?.scrollIntoView({ behavior: "smooth" });
                                            }
                                        }}
                                    >
                                        {isExpanded ? (
                                            <div>접기 <i className="fas fa-chevron-up" /></div>
                                        ) : (
                                            <div>상품정보 더보기 <i className="fas fa-chevron-down" /></div>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div ref={reviewRef} className={styles.section}>
                            <div className={styles.sectionTitle}>리뷰</div>
                            <div className={styles.reviewSort}>
                                <button
                                    className={sort === "latest" ? styles.active : ""}
                                    onClick={() => setSort("latest")}
                                >
                                    최신순
                                </button>
                                <button
                                    className={sort === "rating" ? styles.active : ""}
                                    onClick={() => setSort("rating")}
                                >
                                    평점순
                                </button>
                            </div>

                            <div className={styles.reviewList}>
                                {currentReviews.map((item) => (
                                    <div key={item.id} className={styles.reviewItem}>
                                        <div className={styles.reviewHeader}>
                                            <div className={styles.userBox}>
                                                <img
                                                    src={item.profileImage ?? "/images/profile/default-profile.jpg"}
                                                    alt="profile"
                                                    className={styles.profile}
                                                />
                                                <div className={styles.userInfo}>
                                                    <span className={styles.nickname}>{item.user}</span>
                                                    <span className={styles.date}>{item.createdAt}</span>
                                                </div>
                                            </div>
                                            <span className={styles.rating}>{item.rating.toFixed(1)}</span>
                                        </div>
                                        <div className={styles.reviewMain}>
                                            {item.image && (
                                                <div className={styles.reviewImage}>
                                                    <img src={item.image} alt="review" />
                                                </div>
                                            )}
                                            <div className={styles.reviewContent}>{item.content}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.pagination}>
                                {Array.from({ length: totalPage }).map((_, i) => (
                                    <button
                                        key={i}
                                        className={page === i + 1 ? styles.active : ""}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>


                        <div ref={shippingRef} className={styles.section}>
                            <div className={styles.sectionTitle}>배송 및 환불 정책</div>
                            <p>배송 및 환불 정책</p>
                        </div>


                        <div ref={qnaRef} className={styles.section}>
                            <div className={styles.sectionTitle}>문의</div>
                            <div className={styles.qnaList}>
                                {product.qna.map((item) => (
                                    <div key={item.id} className="card textOnly">
                                        <div className="meta">
                                            <div className={styles.qnaTitle}>{item.question}</div>
                                            <div className="nickname">{item.user} · {item.date}</div>
                                        </div>
                                        <div className="content">{item.answer}</div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.moreWrapper}>
                                <button className={styles.moreBtn}> 문의 더보기
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.purchaseWrapper}>
                    <div className={styles.box}>
                        <div className="meta">
                            <div className={styles.vendor}>{product.vendor}</div>
                            <div className={styles.title}>{product.title}</div>
                            <div className={styles.rating}>
                                ⭐ {product.rating} <span>({product.reviewCount})</span>
                            </div>

                            <div className={styles.priceBox}>
                                {product.discountRate > 0 && (
                                    <div className={styles.discountRow}>
                                        <span className={styles.discount}>
                                            {product.discountRate * 100}%
                                        </span>
                                        <span className={styles.originalPrice}>
                                            {product.originalPrice.toLocaleString()}원
                                        </span>
                                    </div>
                                )}

                                <div className={styles.finalPrice}>
                                    {product.finalPrice.toLocaleString()}
                                    <span className={styles.notBold}>원</span>
                                </div>
                            </div>

                            {/* 옵션 */}
                            <div className={styles.optionSelectBox}>
                                <label>옵션 선택</label>
                                <select>
                                    <option>기본 옵션</option>
                                    <option>테스트 옵션</option>
                                </select>
                            </div>

                            {/* 수량 */}
                            <div className={styles.quantityWrapper}>
                                <span>수량</span>
                                <div className={styles.quantityBox}>
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)}>+</button>
                                </div>
                            </div>

                            {/* 총 금액 */}
                            <div className={styles.totalBox}>
                                <span>총 상품 금액</span>
                                <strong>{(product.finalPrice * quantity).toLocaleString()}원</strong>
                            </div>

                            {/* 버튼 */}
                            <div className={styles.actions}>
                                <button className={styles.cartBtn}>장바구니</button>
                                <button className={styles.buyBtn}>구매하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}