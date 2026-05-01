export type BoardType = "notice" | "board" | "ceremony";
export type SortType = "latest" | "views" | "popular";

export interface Post {
  id: string;
  board: BoardType;
  title: string;
  preview?: string;
  content?: string;
  author: string;
  views: number;
  thumbnail?: string | null;
  tags?: string[];
  createdAt?: string;
}