import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mockProducts from "@/data/mockProducts.json";
import type { ProductMainKey } from "@/constants/menu";

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

export default function ProductPage() {
  const { main, sub } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!main || !sub) {
      setProducts([]);
      return;
    }

    if (!(main in mockProducts)) {
      setProducts([]);
      return;
    }

    const mainKey = main as ProductMainKey;
    const mainMenu = mockProducts[mainKey];

    if (!(sub in mainMenu)) {
      setProducts([]);
      return;
    }

    setProducts(mainMenu[sub as keyof typeof mainMenu]);
  }, [main, sub]);

  return (
    <div className="contents-container">
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}원
          </li>
        ))}
      </ul>
    </div>
  );
}