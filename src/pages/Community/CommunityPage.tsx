import Pagination from "@/components/community/Pagination";
import PostList from "@/components/community/PostList";
import SortBar from "@/components/community/SortBar";
import TagFilter from "@/components/community/TagFilter";
import WriteButton from "@/components/community/WriteButton";
import type { BoardType, SortType } from "@/type/community";
import { useState } from "react"
import { posts } from "@/data/community/communityMock";
import styles from "./CommunityPage.module.css"

type Props = {
    board: BoardType;
}

export default function CommunityPage({ board }: Props) {
    const [sort, setSort] = useState<SortType>("latest");
    const [tag, setTag] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const pageSize = 5;

    let filtered = posts.filter((post) => post.board === board);

    if (tag) {
        filtered = posts.filter((post) => post.tags && post.tags.includes(tag));
    }

    if(sort === "views") {
        filtered = [...filtered].sort((a, b) => b.views - a.views);
    }

    const totalPage = Math.ceil(filtered.length / pageSize);

    const pagedPosts = filtered.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <SortBar sort={sort} onChange={setSort} />
                {board === "board" && (
                    <TagFilter selected={tag} onChange={setTag} />
                )}
            </div>

                {board !== "notice" && (
                    <div className={styles.writeArea}>
                        <WriteButton />
                    </div>
                )}

            <div className={styles.listArea}>
                <PostList posts={pagedPosts} />
            </div>
            
            <div className={styles.paginationArea}>
                <Pagination page={page} total={totalPage} onChange={setPage} />
            </div>
        </div>
    );
}