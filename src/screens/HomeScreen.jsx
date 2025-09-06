'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase/supabaseClient';
import {Header} from '../components/layout/header';
import {Footer} from '../components/layout/footer';
import {HeroSection} from '../components/home/hero-section';
import {BrandShowcase} from '../components/home/brand-showcase';
import {CategoryGrid} from '../components/home/category-grid';
import {FeaturedProducts} from '../components/home/featured-products';
import {DailyEssentials} from '../components/home/daily-essentials';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('../../screens/auth/login/');
        return;
      }
      
      setUser(session.user);
      setLoading(false);
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('../../screens/auth/login/');
      } else {
        setUser(session.user);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  

  return (
    <section className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection /> 
      {/* <BrandShowcase />  */}
      <CategoryGrid />
      <FeaturedProducts />
      
      <DailyEssentials />
     
      
      <Footer />
    </section>
  );
}