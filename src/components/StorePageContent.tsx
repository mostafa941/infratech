"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

import CategoryGrid, { categories } from "./CategoryGrid";
import FiltersSidebar from "./FiltersSidebar";
import ProductsGrid from "./ProductsGrid";
import BrandsSection from "./BrandsSection";

function StorePageContent() {
  const { addToCart, searchQuery } = useAppContext();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(1500); // Max range limit
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // We fetch multiple categories to populate the store with richer content
        const response = await axios.get("https://dummyjson.com/products?limit=100");
        setProducts(response.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter application Logic
  useEffect(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search Query Filter
    if (searchQuery.trim() !== "") {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price Filter
    result = result.filter((p) => p.price <= priceRange);

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    const success = addToCart(product);
    if (!success) {
      // Not logged in -> Redirect to login page
      router.push(`/login?redirect=/products/${product.id}`);
    } else {
      alert(`Added "${product.title}" to cart!`);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setPriceRange(2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8" dir="ltr">
      <CategoryGrid selectedCategory={selectedCategory} onSelect={setSelectedCategory} />

      <div className="flex flex-col lg:flex-row gap-8">
        <FiltersSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ProductsGrid
          products={filteredProducts}
          loading={loading}
          onAddToCart={handleAddToCart}
          onClearFilters={handleClearFilters}
        />
      </div>

      <BrandsSection />
    </div>
  );
}

export default StorePageContent;