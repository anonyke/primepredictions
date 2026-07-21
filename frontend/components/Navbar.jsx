'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-white font-bold text-lg no-underline">
          <span className="text-green-400 text-xl">⚡</span>
          PrimePredict
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-gray-300 hover:text-green-400 transition text-sm no-underline">Home</a>
          <a href="/predictions" className="text-gray-300 hover:text-green-400 transition text-sm no-underline">Free Predictions</a>
          <a href="/premium" className="text-gray-300 hover:text-green-400 transition text-sm no-underline">Premium</a>
          <a href="/results" className="text-gray-300 hover:text-green-400 transition text-sm no-underline">Results</a>
          <a href="/pricing" className="text-gray-300 hover:text-green-400 transition text-sm no-underline">Pricing</a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <a href="/dashboard" className="text-gray-300 hover:text-green-400 text-sm no-underline">Dashboard</a>
              <button onClick={logout} className="border border-green-400 text-green-400 px-4 py-1.5 rounded text-sm bg-transparent cursor-pointer hover:bg-green-400 hover:text-black transition">
                Logout
              </button>
            </div>
          ) : (
            <>
              <a href="/login" className="border border-green-400 text-green-400 px-4 py-1.5 rounded text-sm no-underline hover:bg-green-400 hover:text-black transition">Login</a>
              <a href="/register" className="bg-green-400 text-black px-4 py-1.5 rounded text-sm font-semibold no-underline hover:bg-green-300 transition">Register</a>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white bg-none border-none text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800 px-6 py-4 flex flex-col gap-4">
          <a href="/" className="text-gray-300 hover:text-green-400 text-sm no-underline" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/predictions" className="text-gray-300 hover:text-green-400 text-sm no-underline" onClick={() => setMenuOpen(false)}>Free Predictions</a>
          <a href="/premium" className="text-gray-300 hover:text-green-400 text-sm no-underline" onClick={() => setMenuOpen(false)}>Premium</a>
          <a href="/results" className="text-gray-300 hover:text-green-400 text-sm no-underline" onClick={() => setMenuOpen(false)}>Results</a>
          <a href="/pricing" className="text-gray-300 hover:text-green-400 text-sm no-underline" onClick={() => setMenuOpen(false)}>Pricing</a>
          <hr className="border-gray-800" />
          {user ? (
            <>
              <a href="/dashboard" className="text-gray-300 hover:text-green-400 text-sm no-underline" onClick={() => setMenuOpen(false)}>Dashboard</a>
              <button onClick={() => { logout(); setMenuOpen(false); }} className="text-red-400 text-sm bg-none border-none text-left cursor-pointer">Logout</button>
            </>
          ) : (
            <div className="flex gap-3">
              <a href="/login" className="border border-green-400 text-green-400 px-4 py-1.5 rounded text-sm no-underline" onClick={() => setMenuOpen(false)}>Login</a>
              <a href="/register" className="bg-green-400 text-black px-4 py-1.5 rounded text-sm font-semibold no-underline" onClick={() => setMenuOpen(false)}>Register</a>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
