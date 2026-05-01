import type { Post } from "@/type/community";

export const posts: Post[] = [
  {
    id: "1",
    board: "board",
    title: "웨딩 촬영 꿀팁",
    preview: "야외 촬영할 때 주의할 점...",
    content: "야외 촬영할 때는 날씨와 동선을 미리 체크하는 게 좋아요.",
    author: "신부_지현",
    views: 120,
    thumbnail: "/images/sample.jpg",
    tags: ["촬영", "웨딩"],
    createdAt: "2026-04-30",
  },
];