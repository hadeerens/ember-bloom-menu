import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import Footer from '@/components/Footer';
import FloatingCart from '@/components/FloatingCart';
import CallWaiterButton from '@/components/CallWaiterButton';
import MobileNav from '@/components/MobileNav';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pb-20 md:pb-0">
      <Header />
      <main>
        <HeroSection />
        <MenuSection />
      </main>
      <Footer />
      
      {/* Floating Actions */}
      <FloatingCart />
      <CallWaiterButton />
      <MobileNav />
    </div>
  );
};

export default Index;
