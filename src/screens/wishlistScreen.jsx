
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/supabaseClient';
import Link from 'next/link';

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setLoading(false);
      // Assume wishlist table has product_id and user_id
      const { data: wishlist } = await supabase
        .from('wishlist')
        .select('id, product_id, product:product_id(name, slug, price, product_image)')
        .eq('user_id', user.id);
      setItems(wishlist || []);
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (id) => {
    await supabase.from('wishlist').delete().eq('id', id);
    setItems(items => items.filter(item => item.id !== id));
  };

  if (loading) return <div className="p-8 text-center text-black">Loading...</div>;
  if (items.length === 0) return (
    <div className="p-8 text-center text-black">
      <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
      <Link href="/" className="text-blue-600 underline">Continue Shopping</Link>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-black">My Wishlist</h2>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <Link href={`/products/${item.product.slug}`} className="flex items-center space-x-4 group">
              <img src={item.product.product_image || '/api/placeholder/80/80'} alt="" className="w-16 h-16 rounded object-cover transition-all duration-150 group-hover:scale-105" />
              <div>
                <div className="font-medium text-black">{item.product.name}</div>
                <div className="text-gray-600">{item.product.price}</div>
              </div>
            </Link>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="text-red-600 hover:text-red-800 px-3 py-1 rounded transition-all duration-150 focus:ring-2 focus:ring-red-500 focus:outline-none"
              aria-label="Remove from wishlist"
            > Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
