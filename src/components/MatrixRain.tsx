"use client";
import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Resize handler
    const handleResize = (): void => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Matrix characters - using binary and hex for a tech look
    const chars: string = '01010111010001110110100101010100010010000100001001001100010101010100010100100000010000010101001001000011010010000100100101010100010001010100001101010100010101010101001001000101';
    
    // Column setup
    const fontSize: number = 14;
    const columns: number = canvas.width / fontSize;
    
    // Array to track the y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100); // Start above the canvas for staggered effect
    }
    
    // Colors: Arch Linux blue, white, and Chelsea blue
    const colors: string[] = [
      '#1793D1', // Arch Linux blue
      '#FFFFFF', // White
      '#034694'  // Chelsea blue
    ];
    
    // Drawing the characters
    function draw(): void {
      if (!ctx || !canvas) return;
      
      // Black background with opacity for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px monospace`;
      
      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text: string = chars[Math.floor(Math.random() * chars.length)];
        
        // Alternate colors
        const colorIndex: number = Math.floor(Math.random() * colors.length);
        ctx.fillStyle = colors[colorIndex];
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down
        drops[i]++;
        
        // Reset when off the bottom of the screen + random factor for varied lengths
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -100);
        }
      }
    }
    
    // Animation loop
    const interval = setInterval(draw, 33); // ~30fps
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-[-2] opacity-30"
    />
  );
}
