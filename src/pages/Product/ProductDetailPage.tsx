import { useEffect, useRef, useState } from "react";
import styles from "@/pages/Product/ProductDetailPage.module.css";
import detail from "@/data/wedding/product/mockProductDetail.json";

interface regionShippingItem {
    id: string;
    policyId: string;
    regionType: string;
    extraFee: number;
}

interface baseShippingItem {
    id: string;
    type: string;
    baseFee: number;
    freeThreshold: number;
}

interface OptionItem {
    id: string;
    label: string;
    price: number;
}

interface QnaItem {
    id: string;
    isAnswered: boolean;
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
    qnaCount: number;
    qna: QnaItem[];
    reviews: ReviewItem[];
    isOptionRequired: boolean;
    options?: OptionItem[];
    baseShippingPolicy: baseShippingItem[];
    RegionShippingPolicy: regionShippingItem[];
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
    const [reviewPage, setReviewPage] = useState(1);
    const pageSize = 5;
    const start = (reviewPage - 1) * pageSize;





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

    useEffect(() => {
        reviewRef.current?.scrollIntoView({ behavior: "auto" });
    }, [reviewPage]);

    if (!product) return <div>상품을 찾을 수 없습니다.</div>;

    const thumbnails = product.thumbnails;
    const currentReviews = product.reviews.slice(start, start + pageSize);
    const totalPage = Math.ceil(product.reviews.length / pageSize);
    const PAGE_SIZE = 5;
    const startPage = Math.floor((reviewPage - 1) / PAGE_SIZE) * PAGE_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_SIZE - 1, totalPage);

    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );


    const policy = product.baseShippingPolicy[0];
    const regionFees = product.RegionShippingPolicy;

    const getShippingText = (policy: any, regionFees: any[]) => {
        if (!policy) return "";

        const baseFee = policy.baseFee.toLocaleString();
        const threshold = policy.freeThreshold?.toLocaleString();

        let text = "";

        // 1. 기본 정책
        if (policy.type === "FREE") {
            text = "무료배송";
        }

        if (policy.type === "FLAT") {
            text = `${baseFee}원`;
        }

        if (policy.type === "CONDITIONAL") {
            text = `${baseFee}원 (${threshold}원 이상 무료)`;
        }

        // 2. 지역 추가요금
        if (regionFees?.length > 0) {
            const extraText = regionFees
                .map((f) => {
                    if (f.regionType === "REMOTE") return `산간 +${f.extraFee.toLocaleString()}원`;
                    if (f.regionType === "ISLAND") return `도서 +${f.extraFee.toLocaleString()}원`;
                    return null;
                })
                .filter(Boolean)
                .join(", ");

            if (extraText) {
                text += ` / ${extraText}`;
            }
        }

        return text;
    };

    return (
        <div className={styles.localContainer}>
            <div className={styles.layout}>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageBox}>
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
                        <button onClick={() => handleTabClick("detail", detailRef)}
                            className={tab === "detail" ? styles.active : ""}>
                            상품정보
                        </button>
                        <button onClick={() => handleTabClick("review", reviewRef)}
                            className={tab === "review" ? styles.active : ""}>
                            리뷰
                            {product.reviewCount >= 0 && (
                                <span className={styles.countNumber}>{product.reviewCount}</span>
                            )}
                        </button>
                        <button onClick={() => handleTabClick("shipping", shippingRef)}
                            className={tab === "shipping" ? styles.active : ""}>
                            배송/환불
                        </button>
                        <button onClick={() => handleTabClick("qna", qnaRef)}
                            className={tab === "qna" ? styles.active : ""}>
                            문의
                            {product.qnaCount >= 0 && (
                                <span className={styles.countNumber}>{product.qnaCount}</span>
                            )}
                        </button>
                    </div>

                    <div className={styles.detailContent}>
                        <div ref={detailRef} className={styles.section}>
                            <div className={styles.sectionTitle}>상품정보</div>
                            <div ref={detailContentRef}
                                className={`${styles.detailContent} ${!isExpanded ? styles.collapsed : ""}`}                            >
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

                        <div className="divider"></div>

                        <div ref={reviewRef} className={styles.section}>
                            <div className={styles.sectionTitle}>
                                리뷰
                                {product.reviewCount >= 0 && (
                                    <span className={styles.countNumber}>{product.reviewCount}</span>
                                )}
                            </div>
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
                                                    <span className={styles.rating}>
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <span
                                                                key={i}
                                                                className={i < item.rating ? styles.filledStar : styles.emptyStar}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </span>

                                                    <span className={styles.nickname}>{item.user}</span>
                                                    <span className={styles.date}>{item.createdAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.reviewMain}>
                                            <div className={styles.reviewContent}>{item.content}</div>
                                            {item.image && (
                                                <div className={styles.reviewImage}>
                                                    <img src={item.image} alt="review" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.pagination}>
                                <button onClick={() => setReviewPage(1)} disabled={reviewPage === 1}>
                                    <i className="fas fa-angles-left"></i>
                                </button>
                                <button onClick={() => setReviewPage(reviewPage - 1)} disabled={reviewPage === 1}>
                                    <i className="fas fa-angle-left"></i>
                                </button>

                                {pages.map((p) => (
                                    <button
                                        key={p}
                                        className={`${styles.pageNumber} ${reviewPage === p ? styles.active : ""}`}
                                        onClick={() => setReviewPage(p)}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button onClick={() => setReviewPage(reviewPage + 1)} disabled={reviewPage === totalPage}>
                                    <i className="fas fa-angle-right"></i>
                                </button>
                                <button onClick={() => setReviewPage(totalPage)} disabled={reviewPage === totalPage}>
                                    <i className="fas fa-angles-right"></i>
                                </button>
                            </div>
                        </div>

                        <div className="divider"></div>
                        <div ref={shippingRef} className={styles.section}>
                            <div className={styles.sectionTitle}>배송 및 환불 정책</div>
                            <p>배송 및 환불 정책</p>
                        </div>


                        <div className="divider"></div>
                        <div ref={qnaRef} className={styles.section}>
                            <div className={styles.sectionTitle}>
                                문의
                                {product.qnaCount >= 0 && (
                                    <span className={styles.countNumber}>{product.qnaCount}</span>
                                )}
                            </div>
                            <div className={styles.qnaList}>
                                {product.qna.map((item) => (
                                    <div key={item.id} className="card textOnly">
                                        <div className="meta">
                                            <span>
                                                [{item.isAnswered === true ? "답변완료" : "답변대기"}]
                                            </span>
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
                    <div className={styles.purchaseBox}>
                        <div className="meta">
                            <div className={styles.vendor}>{product.vendor}</div>
                            <div className={styles.productTitle}>{product.title}</div>
                            <div>
                                <span className={styles.filledStar}>★</span>
                                <span className={styles.rating}>{product.rating} ({product.reviewCount})</span>
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
                                    {product.finalPrice.toLocaleString()}원
                                </div>
                            </div>
                            <div className={styles.shippingBox}>
                                <div className={styles.shippingRow}>
                                    <span className={styles.label}>배송</span>
                                    <span className={styles.value}>
                                        {getShippingText(policy, regionFees)}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.optionSelectBox}>
                                <label>옵션 선택</label>
                                <div className={styles.selectWrapper}>
                                    <select>
                                        <option>옵션 추가</option>
                                        <option>프리미엄 옵션 (+10,000원)</option>
                                    </select>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                            </div>
                            <div className={styles.quantityBox}>
                                <label>수량</label>
                                <div className={styles.quantityWrapper}>
                                    <button type="button">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <span>{quantity}</span>
                                    <button type="button">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.totalBox}>
                                <label>총 금액</label>
                                <strong>{(product.finalPrice * quantity).toLocaleString()}원</strong>
                            </div>

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