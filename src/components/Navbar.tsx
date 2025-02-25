"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  const navItems = ['HOME', 'PROJECTS', 'BLOG'];
  
  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50
      bg-black text-white border-b-4 border-white p-4
      ${scrollPosition > 50 ? 'shadow-[0_8px_0_rgba(255,255,255,0.5)]' : ''}
      transition-all duration-300
    `}>
      <div className="w-[90%] sm:w-[80%] md:w-[70%] mx-auto relative">
        {/* Glitch effect on scroll */}
        {scrollPosition > 100 && (
          <div className="absolute -left-2 top-0 w-[10px] h-full bg-white opacity-30"></div>
        )}
        
        {/* Logo Area */}
        <div className="flex justify-between items-center mb-4 sm:mb-0">
          <Link href="/" 
            className="text-2xl sm:text-3xl font-bold uppercase font-mono tracking-tighter group"
            onMouseEnter={() => setIsHovered('logo')}
            onMouseLeave={() => setIsHovered(null)}
          >
            <span className={`
              ${isHovered === 'logo' ? 'bg-white text-black' : ''} 
              p-1 inline-block relative
              ${scrollPosition > 150 ? 'animate-pulse' : ''}
            `}>
              LOW_LEVEL_CODER
              {isHovered === 'logo' && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white"></span>
              )}
            </span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="sm:hidden border-2 border-white p-1 hover:bg-white hover:text-black transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
          
          {/* Current Time Display */}
          <div className="hidden sm:flex font-mono text-sm border-2 border-white p-1 items-center">
            <span className="animate-blink mr-1">●</span>
            <span className="mr-2">LIVE:</span>
            {currentTime}
          </div>
        </div>
        
        {/* Navigation Links - Desktop */}
        <div className={`
          hidden sm:grid grid-cols-3 gap-2 mt-4 border-t-2 border-white pt-4
        `}>
          {navItems.map((item, index) => (
            <Link 
              key={item} 
              href={`/${item === 'HOME' ? '' : item.toLowerCase()}`}
              onMouseEnter={() => setIsHovered(item)}
              onMouseLeave={() => setIsHovered(null)}
              className={`
                text-center p-2 font-mono text-lg uppercase relative
                ${isHovered === item ? 'bg-white text-black' : 'bg-black text-white'} 
                border-2 border-white hover:bg-white hover:text-black transition-colors
                ${index % 2 === 0 ? 'transform-gpu hover:-translate-y-1' : 'transform-gpu hover:translate-y-1'}
              `}
            >
              {/* Pixel corner accents */}
              <span className="absolute top-0 left-0 w-2 h-2 bg-white"></span>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-white"></span>
              
              {item}
              
              {/* Indicator for current page */}
              {item === 'HOME' && (
                <span className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full"></span>
              )}
            </Link>
          ))}
        </div>
        
        {/* Navigation Links - Mobile */}
        <div className={`
          sm:hidden 
          ${isMobileMenuOpen ? 'max-h-[300px] opacity-100 border-t-2 border-white pt-4 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}
          transition-all duration-300 ease-in-out
        `}>
          {navItems.map((item, index) => (
            <Link 
              key={item} 
              href={`/${item === 'HOME' ? '' : item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                block text-center p-3 font-mono text-lg uppercase relative mb-2
                bg-black text-white border-2 border-white hover:bg-white hover:text-black transition-colors
              `}
            >
              {/* Pixel corner accents */}
              <span className="absolute top-0 left-0 w-2 h-2 bg-white"></span>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-white"></span>
              
              {item}
              
              {/* Indicator for current page */}
              {item === 'HOME' && (
                <span className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full"></span>
              )}
            </Link>
          ))}
          
          {/* Mobile Time Display */}
          <div className="flex font-mono text-sm border-2 border-white p-2 items-center justify-center mt-4">
            <span className="animate-blink mr-1">●</span>
            <span className="mr-2">LIVE:</span>
            {currentTime}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="hidden sm:block absolute -right-8 top-0 h-full w-2">
          <div 
            className="bg-white h-8 w-full"
            style={{ 
              transform: `translateY(${Math.min(scrollPosition / 2, 100)}px)`,
              opacity: scrollPosition > 0 ? 1 : 0
            }}
          ></div>
        </div>
      </div>
    </nav>
  );
}
