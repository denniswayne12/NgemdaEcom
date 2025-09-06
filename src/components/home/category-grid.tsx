"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import Image from "next/image";

// Define the type for a category object
type Category = {
  id: string;
  name: string;
  href: string;
  iconUrl?: string;
};

// Initial categories with the defined type
const initialCategories: Category[] = [
  {
    id: "mobile",
    name: "Mobile",
    href: "/categories/mobile"
  },
  {
    id: "cosmetics", 
    name: "Cosmetics",
    href: "/categories/cosmetics"
  },
  {
    id: "electronics",
    name: "Electronics", 
    href: "/categories/electronics"
  },
  {
    id: "furniture",
    name: "Furniture",
    href: "/categories/furniture"
  },
  {
    id: "watches",
    name: "Watches",
    href: "/categories/watches"
  },
  {
    id: "decor",
    name: "Decor",
    href: "/categories/decor"
  },
  {
    id: "accessories",
    name: "Accessories", 
    href: "/categories/accessories"
  }
];

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryIcons = async () => {
      try {
        const updatedCategories = await Promise.all(
          initialCategories.map(async (category) => {
            // Map category.id 
            let filename = "";
            switch(category.id) {
              case "mobile":
                filename = "icons8-smartphone-64.png";
                break;
              case "cosmetics":
                filename = "icons8-cosmetics-64.png";
                break;
              case "electronics":
                filename = "circuit-board.png";
                break;
              case "furniture":
                filename = "icons8-dining-chair-64.png";
                break;
              case "watches":
                filename = "wristwatch.png";
                break;
              case "decor":
                filename = "icons8-sparkling-diamond-64.png";
                break;
              case "accessories":
                filename = "icons8-tailors-dummy-64.png";
                break;
              default:
                return category;
            }

            // Try to get the icon from Supabase Storage
            const { data } = supabase.storage
              .from('category-icons')
              .getPublicUrl(`/icons/${filename}`);
            
            // If icon exists, use it
            if (data?.publicUrl) {
              return {
                ...category,
                iconUrl: data.publicUrl
              };
            }
            return category;
          })
        );
        
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error fetching category icons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryIcons();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900"> 
            Shop From <span className="text-blue-600">Top Categories</span>
          </h2>
          <Link href="/categories" className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {initialCategories.map((category) => (
            <div  key={category.id} className="flex flex-col items-center p-6 bg-gray-50 rounded-lg animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900  border-b-2 border-blue-600 pb-2">
          Shop From <span className="text-blue-600 ">Top Categories</span>
        </h2>
        <Link href="/categories" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200"
          >
            <div className="mb-3 group-hover:scale-110 transition-transform duration-200">
              {category.iconUrl ? (
                <div className="relative w-15 h-15 ">
                  <Image
                    src={category.iconUrl}
                    alt={`${category.name} icon`}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      console.warn(`Failed to load image for ${category.name}:`, e);
                    }}
                  />
                </div>
              ) : (
                <div className="text-4xl">
                  {category.id === "mobile" && "📱"}
                  {category.id === "cosmetics" && "💄"}
                  {category.id === "electronics" && "🔌"}
                  {category.id === "furniture" && "🪑"}
                  {category.id === "watches" && "⌚"}
                  {category.id === "decor" && "🏺"}
                  {category.id === "accessories" && "👜"}
                  {/* Default fallback */}
                  {"📦"}
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}