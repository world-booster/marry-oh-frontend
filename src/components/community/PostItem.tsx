import { useNavigate } from "react-router-dom";
import type { Post } from "@/type/community";
import styles from "./PostItem.module.css"

interface PostItemProps {
    post: Post;
}

export default function PostItem({ post }: PostItemProps) {
    const navigate = useNavigate();

    return (
        <div className={styles.postItem} onClick={() => navigate(`/community/${post.id}`)}>
            {post.thumbnail && (<img className={styles.thumbnail} src={post.thumbnail} alt={post.title} />)}

            <div className={styles.content}>
                <h3 className={styles.title}>{post.title}</h3>
                {post.preview && <p className={styles.preview}>{post.preview}</p>}

                <div className={styles.meta}>
                    <span>{post.author}</span>
                    <span>조회 {post.views}</span>
                    <span>{post.createdAt}</span>
                </div>
            </div>
        </div>
    )
}