"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | null>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  if (!products)
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <div className="h-full w-full object-cover object-center" />
              </div>
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <span aria-hidden="true" className="absolute inset-0" />
                  Loading...
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <p className="mt-1 text-sm text-gray-500">Loading...</p>
                  <p className="mt-2 font-semibold text-red-600">Loading...</p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">
                  $Loading...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <div
              key={product.id}
              className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
            >
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Image
                  height={96}
                  width={96}
                  src={product.images[3]}
                  alt="product img"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/products/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <div className="flex flex-col items-center">
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                  <p
                    className={`mt-1 text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
                <p className="mt-1 text-base font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
