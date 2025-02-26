"use client";
import { useState, useEffect } from 'react';
import MatrixRain from '../components/MatrixRain';

interface GridCell {
  key: number;
  opacity: number;
  hasBackground: boolean;
}

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<'main' | 'about'>('main');
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [gridCells, setGridCells] = useState<GridCell[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  
  // Create glitch effect when switching sections
  useEffect(() => {
    setGlitchActive(true);
    const timer = setTimeout(() => {
      setGlitchActive(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeSection]);
  
  // Generate grid cells only on client-side
  useEffect(() => {
    setIsClient(true);
    
    // Generate the grid cells with random properties
    const cells: GridCell[] = [...Array(1600)].map((_, i) => ({
      key: i,
      opacity: Math.random() > 0.7 ? 0.4 : 0.1,
      hasBackground: Math.random() > 0.95
    }));
    
    setGridCells(cells);
  }, []);
  
  return (
    <main className="min-h-screen p-4 md:p-8 bg-black mt-10 relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      {/* Brutalist Background Shapes - Only visible on larger screens */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
        {/* Matrix-like grid with alternating green and white vertical lines */}
        <div className="absolute inset-0 z-[-1] opacity-15 hidden md:block">
          {isClient && (
            <>
              <div className="grid grid-cols-40 grid-rows-40 h-screen w-screen">
                {gridCells.map((cell) => (
                  <div 
                    key={cell.key} 
                    className="border-[0.5px] border-white opacity-80"
                    style={{
                      opacity: cell.opacity,
                      backgroundColor: cell.hasBackground ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Alternating green and white vertical lines */}
              <div className="absolute inset-0 flex justify-between">
                {[...Array(70)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-[10px] h-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-white'}`}
                    style={{ opacity: i % 2 === 0 ? 0.6 : 0.40 }}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
        {/* Large circle
        <div className="absolute top-1/4 -right-20 w-64 h-64 border-4 border-white opacity-80"></div> */}
        
        {/* Cross shape */}
        <div className="absolute bottom-1/3 -left-20 w-40 h-8 bg-white opacity-7"></div>
        <div className="absolute bottom-1/3 -left-4 w-8 h-40 bg-white opacity-8"></div>
        
        {/* Diagonal lines */}
        <div className="absolute top-20 left-1/4 w-1 h-40 bg-white opacity-8" 
          style={{ transform: 'rotate(45deg)' }}></div>
        <div className="absolute bottom-20 right-1/4 w-1 h-40 bg-white opacity-7" 
          style={{ transform: 'rotate(-45deg)' }}></div>
        
        
        {/* Dot pattern */}
        <div className="absolute top-1/4 right-0 grid grid-cols-10 gap-5 opacity-30">
          {[...Array(150)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
          ))}
        </div>
        
        {/* Triangle */}
        <div className="absolute bottom-1/4 right-1/4 w-0 h-0 opacity-90"
          style={{ 
            borderLeft: '60px solid transparent', 
            borderRight: '60px solid transparent', 
            borderBottom: '120px solid white' 
          }}>
        </div>
        {/* C Code - Memory Management */}
        <div className="absolute top-60 left-10 font-mono text-s text-white opacity-80 whitespace-pre">
          {'#include <stdio.h>\n#include <stdlib.h>\n\nint main(int argc, char *argv[]) {\n  printf("Hello, Welcome to my Portfolio!\\n");\n  \n  int *projects = (int*)malloc(sizeof(int) * 10);\n  if (projects == NULL) {\n    return EXIT_FAILURE;\n  }\n  \n  for (int i = 0; i < 10; i++) {\n    projects[i] = 2023 + i; // Years of upcoming projects\n  }\n  \n  free(projects);\n  return EXIT_SUCCESS;\n}'}
        </div>

        {/* Rust Code - Systems Programming */}
        <div className="absolute bottom-40 right-20 font-mono text-sm text-white opacity-80 whitespace-pre">
          {'fn portfolio_init() -> Result<(), Error> {\n  println!("PORTFOLIO INITIALIZED");\n  \n  let skills = vec!["Systems", "Cloud", "DevOps"];\n  let projects = initialize_projects()?;\n  \n  loop {\n    // Main portfolio showcase\n    update_visitor_count();\n    handle_contact_requests();\n    display_latest_work();\n  }\n}'}
        </div>

        {/* Python Code - Data Analysis */}
        <div className="absolute top-2/3 left-40 font-mono text-xxxl text-white opacity-100 whitespace-pre transform">
          {'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndef analyze_skills():\n    skills = {\n        "Infrastructure": 95,\n        "Cloud": 90,\n        "DevOps": 85,\n        "Security": 80\n    }\n    \n    df = pd.DataFrame(skills.items())\n    plt.bar(df[0], df[1])\n    plt.title("My Technical Skills")\n    plt.show()\n    \nanalyze_skills()'}
        </div>

        {/* Bash Script - Automation */}
        <div className="absolute top-1/3 left-3/4 font-mono text-xxxl text-white opacity-100 whitespace-pre transform">
          {'#!/bin/bash\n\necho "Deploying Portfolio Website..."\n\n# Check dependencies\nif [ ! -d "node_modules" ]; then\n  echo "Installing dependencies..."\n  npm install\nfi\n\n# Build and deploy\nnpm run build\n\necho "Portfolio successfully deployed!"\nexit 0'}
        </div>
        
        {/* "WOW" in binary */}
        <div className="absolute top-20 right-1/4 font-mono text-xl text-white opacity-60 tracking-wider">
          01010111 01001111 01010111
        </div>
        
        {/* Binary Graffiti - Abstract face */}
        <div className="absolute bottom-[500px] left-[450px] font-mono text-xl text-white opacity-20 whitespace-pre">
          {'10101010101010101010\n01111111111111111110\n10100100001001001010\n10101000001000101010\n10100000000000001010\n10100100000001001010\n10101000000000101010\n10101010000010101010\n01111111111111111110\n10101010101010101010'}
        </div>
        
        {/* Binary Graffiti - Abstract pattern */}
        <div className="absolute top-1/3 left-1/2 font-mono text-xs text-white opacity-70 whitespace-pre transform">
          {'0101010101010101\n1010101010101010\n0101010101010101\n1010101010101010\n0101010101010101\n1010101010101010\n0101010101010101\n1010101010101010'}
        </div>
        
        {/* Binary Code Stream */}
        <div className="absolute top-[500px] left-[300px] font-mono text-l text-white opacity-60 whitespace-pre transform">
          {'01001000 01000001 01000011 01001011\n01010100 01001000 01000101 01010000\n01001100 01000001 01001110 01000101\n01010100 00100001 00100001 00100001'}
        </div>
      </div>
      {/* Terminal-style header */}
      <div className="w-full max-w-3xl mx-auto sm:mt-32 mt-24 relative z-10">
        
        {/* Content Sections */}
        <div className="relative border-4 border-white">
          {/* Glitch overlay */}
          {glitchActive && (
            <div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-8 bg-white opacity-20" 
                style={{ transform: 'translateY(100px)' }}></div>
              <div className="absolute top-0 left-0 w-full h-2 bg-white opacity-40" 
                style={{ transform: 'translateY(150px)' }}></div>
              <div className="absolute top-0 left-0 w-full h-4 bg-white opacity-30" 
                style={{ transform: 'translateY(300px)' }}></div>
            </div>
          )}
          
          {/* Main Content */}
          <div className={`transition-all duration-500 ease-in-out ${
            activeSection === 'main' ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0'
          }`}>
            {/* Header Section */}
            <div className="bg-white text-black p-6 border-b-4 border-black">
              <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                SYSTEM
                <span className="block mt-2 text-2xl md:text-4xl">ENGINEER</span>
              </h1>
            </div>
            
            {/* Main Content */}
            <div className="p-6 bg-black text-white">
              <div className="mb-8 border-b-4 border-white pb-6">
                <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4">INFRASTRUCTURE_ARCHITECT</h2>
                <p className="text-lg md:text-xl mb-4">
                  I DESIGN, IMPLEMENT AND MAINTAIN ROBUST SYSTEM ARCHITECTURES USING CLOUD TECHNOLOGIES, CONTAINERIZATION, AND AUTOMATION.
                </p>
                <p className="text-lg md:text-xl">
                  SPECIALIZING IN SCALABLE INFRASTRUCTURE, SECURITY, AND PERFORMANCE OPTIMIZATION.
                </p>
              </div>
              
              {/* Tech Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="border-4 border-white p-4">
                  <h3 className="text-xl font-bold mb-2 uppercase">INFRASTRUCTURE</h3>
                  <ul className="space-y-1">
                    <li className="font-mono">AWS/AZURE/GCP</li>
                    <li className="font-mono">KUBERNETES</li>
                    <li className="font-mono">DOCKER</li>
                    <li className="font-mono">TERRAFORM</li>
                  </ul>
                </div>
                <div className="border-4 border-white p-4">
                  <h3 className="text-xl font-bold mb-2 uppercase">OPERATIONS</h3>
                  <ul className="space-y-1">
                    <li className="font-mono">CI/CD PIPELINES</li>
                    <li className="font-mono">MONITORING</li>
                    <li className="font-mono">SECURITY</li>
                    <li className="font-mono">LINUX/UNIX</li>
                  </ul>
                </div>
              </div>
              
              {/* Additional Skills Section */}
              <div className="mb-8 border-4 border-white p-4">
                <h3 className="text-xl font-bold mb-2 uppercase">AUTOMATION & SCRIPTING</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <ul className="space-y-1">
                      <li className="font-mono">PYTHON</li>
                      <li className="font-mono">BASH</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1">
                      <li className="font-mono">ANSIBLE</li>
                      <li className="font-mono">JENKINS</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Me Content */}
          <div className={`transition-all duration-500 ease-in-out ${
            activeSection === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible absolute inset-0'
          }`}>
            {/* Header Section */}
            <div className="bg-white text-black p-6 border-b-4 border-black">
              <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                ABOUT
                <span className="block mt-2 text-2xl md:text-4xl">ME</span>
              </h1>
            </div>
            
            {/* About Content */}
            <div className="p-6 bg-black text-white">
              <div className="mb-8 border-b-4 border-white pb-6">
                <h2 className="text-2xl md:text-3xl font-bold uppercase mb-4">WHO_AM_I</h2>
                <p className="text-lg md:text-xl mb-4">
                  LOW-LEVEL PROGRAMMING ENTHUSIAST WITH A PASSION FOR UNDERSTANDING HOW SYSTEMS WORK FROM THE GROUND UP.
                </p>
                <p className="text-lg md:text-xl">
                  CURRENTLY FOCUSED ON OPERATING SYSTEM DEVELOPMENT, COMPILER DESIGN, AND PERFORMANCE OPTIMIZATION.
                </p>
              </div>
              
              {/* Education */}
              <div className="border-4 border-white p-4 mb-8">
                <h3 className="text-xl font-bold mb-2 uppercase">EDUCATION</h3>
                <div className="mb-4">
                  <h4 className="font-bold">B.S. COMPUTER SCIENCE</h4>
                  <p className="font-mono">TECHNICAL UNIVERSITY | 2020-2024</p>
                </div>
                <div>
                  <h4 className="font-bold">SYSTEMS PROGRAMMING CERTIFICATION</h4>
                  <p className="font-mono">ONLINE INSTITUTE | 2023</p>
                </div>
              </div>
              
              {/* Personal Projects */}
              <div className="border-4 border-white p-4 mb-8">
                <h3 className="text-xl font-bold mb-2 uppercase">PERSONAL PROJECTS</h3>
                <ul className="space-y-3">
                  <li>
                    <h4 className="font-bold">MINI OS KERNEL</h4>
                    <p className="text-sm">A minimal operating system kernel written in C and Assembly</p>
                  </li>
                  <li>
                    <h4 className="font-bold">CUSTOM COMPILER</h4>
                    <p className="text-sm">A compiler for a small programming language targeting x86</p>
                  </li>
                  <li>
                    <h4 className="font-bold">EMBEDDED SYSTEMS TOOLKIT</h4>
                    <p className="text-sm">Collection of tools for working with microcontrollers</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terminal-style navigation */}
        <div className="border-2 border-white bg-black text-white mt-4">
          <div className="border-b-2 border-white p-2 font-mono text-sm">
            NAVIGATION:
          </div>
          <div className="p-2">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setActiveSection('main')}
                className={`p-3 font-mono text-sm border-2 transition-colors ${
                  activeSection === 'main' ? 'bg-white text-black' : 'border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                <span className="mr-2">[1]</span>MAIN
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`p-3 font-mono text-sm border-2 transition-colors ${
                  activeSection === 'about' ? 'bg-white text-black' : 'border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                <span className="mr-2">[2]</span>ABOUT
              </button>
            </div>
          </div>
          <div className="p-3 font-mono text-sm border-t-2 border-white">
            <div className="flex items-center">
              <span className="animate-blink mr-2">█</span>
              <span> SELECT OPTION TO CONTINUE...</span>
            </div>
          </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <button className="bg-white text-black p-4 text-lg uppercase hover:bg-black hover:text-white hover:border-4 hover:border-white transition-colors">
            VIEW PROJECTS
          </button>
          <button className="bg-black text-white border-4 border-white p-4 text-lg uppercase hover:bg-white hover:text-black transition-colors">
            CONTACT ME
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-8 border-t-4 border-white pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="font-mono text-white uppercase">© 2025 SYSTEM_ENGINEER</p>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-white underline uppercase hover:text-gray-400">GITHUB</a>
            <a href="#" className="text-white underline uppercase hover:text-gray-400">LINKEDIN</a>
            <a href="#" className="text-white underline uppercase hover:text-gray-400">TWITTER</a>
          </div>
        </div>
      </div>
    </main>
  );
}
