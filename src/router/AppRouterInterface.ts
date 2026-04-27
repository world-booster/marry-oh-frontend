import type { MainMenuKey, SubMenuKey } from "@/constants/menu";

export interface UrlSegments {
  main: MainMenuKey;
  sub: SubMenuKey;
  child?: string;
}

export interface Product{
  id: number;
  title: string;
  price: number;
  img: string;
}