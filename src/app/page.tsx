// src/app/page.tsx
'use client'; // This is a Client Component because of useState and useEffect

import React from 'react';
import Link from 'next/link';
import { Book, Zap, Rocket, ArrowRight, Star, Award } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';

// Feature cards data (can be moved to a separate data file if needed)
const features = [
  {
    icon: <Book className="w-8 h-8 text-indigo-400 dark:text-indigo-300" />,
    title: 'AI-Powered Summaries',
    description: 'Unlock concise summaries of any book, powered by cutting-edge AI for rapid insights and understanding.'
  },
  {
    icon: <Zap className="w-8 h-8 text-rose-400 dark:text-rose-300" />,
    title: 'Instant Deep Dives',
    description: 'Dive deeper into complex topics with AI-generated analysis, key takeaways, and enhanced context.'
  },
  {
    icon: <Rocket className="w-8 h-8 text-teal-400 dark:text-teal-300" />,
    title: 'Accelerate Your Learning',
    description: 'Boost your knowledge retention and reading speed with our smart learning tools and personalized paths.'
  },
  {
    icon: <Award className="w-8 h-8 text-amber-400 dark:text-amber-300" />,
    title: 'Exclusive VIP Content',
    description: 'Access premium, exclusive summaries, expert insights, and early access to new AI features for VIP members.'
  }
];

// Dummy book data for demonstration
const trendingBooks = [
  { id: 1, title: 'The Algorithm of Dreams', author: 'Anya Sharma', cover: 'https://placehold.co/150x225/333333/F5F5F5?text=Book+1', rating: 4.8 },
  { id: 2, title: 'Quantum Quandaries', author: 'Dr. Leo Chen', cover: 'https://placehold.co/150x225/444444/F5F5F5?text=Book+2', rating: 4.5 },
  { id: 3, title: 'Echoes of the Future', author: 'Zoe Ramirez', cover: 'https://placehold.co/150x225/555555/F5F5F5?text=Book+3', rating: 4.9 },
  { id: 4, title: 'The Silent Code', author: 'Marcus Thorne', cover: 'https://placehold.co/150x225/666666/F5F5F5?text=Book+4', rating: 4.7 },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50 font-inter transition-colors duration-300 flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 dark:from-gray-800 dark:to-gray-900 shadow-2xl dark:shadow-indigo-500/20 transition-all duration-500 transform hover:scale-[1.005]">
          {/* Background circles for powerful effect */}
          <div className="absolute inset-0 bg-pattern-dots opacity-10 dark:opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:bg-purple-600"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob [animation-delay:-2s] dark:bg-indigo-600"></div> {/* Using array notation for animation-delay */}

          <div className="relative z-10">
            {/* --- UI/UX Enhancement: Apply new heading font --- */}
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up">
              Unlock the World's Knowledge. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-sky-400">
                Powered by AI.
              </span>
            </h2>
            {/* --- End UI/UX Enhancement --- */}
            <p className="text-xl text-indigo-100 dark:text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-up [animation-delay:0.2s]"> {/* Using array notation for animation-delay */}
              Transform complex books into actionable insights with our cutting-edge AI summarization and review platform.
            </p>
            <Link href="/register" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full shadow-2xl text-indigo-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-indigo-500/50 animate-float-bounce">
              Start Your Free Trial
              <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h3 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 animate-fade-in">
            Revolutionary Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer border border-gray-200 dark:border-gray-700 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index + 0.5}s` }} /* Staggered animation */
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 dark:bg-gray-700 mb-6 group-hover:bg-indigo-100 dark:group-hover:bg-gray-600 transition-colors duration-200 shadow-inner">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Books Section */}
        <section className="py-16">
          <h3 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-sky-500 dark:from-teal-300 dark:to-sky-300 animate-fade-in">
            Trending Books Now
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingBooks.map((book, index) => (
              <div
                key={book.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-200 dark:border-gray-700 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index + 0.8}s` }} /* Staggered animation */
              >
                {/* --- UI/UX Enhancement: Use actual images if available, or enhance placeholder handling --- */}
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-auto rounded-lg mb-4 object-cover object-center shadow-lg group-hover:shadow-indigo-500/30 transition-shadow duration-200"
                  onError={(e) => { 
                    const target = e.target as HTMLImageElement; 
                    target.onerror = null; 
                    // Fallback to a more visually appealing placeholder, or a generic book icon
                    target.src = `https://via.placeholder.com/150x225?text=Book+Cover`; 
                  }}
                />
                {/* --- End UI/UX Enhancement --- */}
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {book.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {book.author}
                </p>
                <div className="flex items-center text-sm text-amber-500 dark:text-amber-400">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span>{book.rating}</span>
                </div>
                <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-200 transform hover:scale-[1.02]">
                  Read Summary
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <TestimonialsSection />
        <FAQSection />

      </main>

      <Footer />
    </div>
  );
};

export default HomePage;