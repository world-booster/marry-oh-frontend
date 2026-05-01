import type { Post } from "@/type/community";
import PostItem from "./PostItem";

interface PostListProps {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {

    return (
        <div>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
}