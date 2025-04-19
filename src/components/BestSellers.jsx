import React from "react";
import { ProductCard } from "./ProductCard";
import { useSelector } from "react-redux";

export default function BestSellers() {
  const { products } = useSelector((state) => state.user);
  // console.log(products[0])
  return (
    <div>
      <div className="mt-16">
        <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
        <div className="flex gap-6 flex-wrap mt-6 ">
          {products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
