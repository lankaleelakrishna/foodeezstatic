/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ShoppingBag, 
  User,
  Star, 
  Clock, 
  ChevronRight, 
  Filter,
  Heart,
  Menu,
  X,
  Play,
  Store,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from './context/CartContext';

const CATEGORIES = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burgers', icon: '🍔' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Salads', icon: '🥗' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Drinks', icon: '🥤' },
  { name: 'Tacos', icon: '🌮' },
  { name: 'Pasta', icon: '🍝' },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "Burger King",
    rating: 4.5,
    time: "20-30 min",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
    tags: ["Burgers", "Fast Food"],
    isFreeDelivery: true,
  },
  {
    id: 2,
    name: "Pizza Hut",
    rating: 4.2,
    time: "30-45 min",
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    tags: ["Pizza", "Italian"],
    isFreeDelivery: false,
  },
  {
    id: 3,
    name: "Sushi biryani",
    rating: 4.8,
    time: "25-40 min",
    distance: "0.8 km",
    image: "https://media.istockphoto.com/id/1443200084/photo/close-up-image-of-round-copper-metal-catering-bowl-containing-rice-dish-of-chicken-biryani-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=J3fyHpLfEL5GOVA-8U394VDRTbEl7TKhuTGkxZX6aGI=",
    tags: ["Sushi", "Japanese"],
    isFreeDelivery: true,
  },
  {
    id: 4,
    name: "Green Garden",
    rating: 4.6,
    time: "15-25 min",
    distance: "1.5 km",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    tags: ["Healthy", "Salads"],
    isFreeDelivery: true,
  },
  {
    id: 5,
    name: "Taco Bell",
    rating: 4.3,
    time: "20-35 min",
    distance: "3.1 km",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    tags: ["Tacos", "Mexican"],
    isFreeDelivery: false,
  },
  {
    id: 6,
    name: "Sweet Delights",
    rating: 4.9,
    time: "10-20 min",
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    tags: ["Desserts", "Bakery"],
    isFreeDelivery: true,
  },
];



export default function App() {
  const navigate = useNavigate();
  const { items } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [forceDesktopHero, setForceDesktopHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img src="/foodlogo.png" alt="Foodeez" className="h-10 w-auto group-hover:scale-110 transition-transform" />
              <h1 className="text-2xl md:text-3xl font-black text-primary tracking-tighter hidden sm:block">
                FOODEEZ
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-stone-600 bg-stone-100/80 px-4 py-2 rounded-full cursor-pointer hover:bg-stone-200 transition-colors">
              <MapPin size={18} className="text-primary" />
              <span className="text-sm font-medium">Hyderabad, HYD</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input 
                type="text"
                placeholder="Search for food, restaurants..."
                className="w-full bg-stone-100 border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/cart')}
              className="p-2 text-stone-600 hover:text-primary transition-colors relative"
            >
              <ShoppingBag size={24} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
            <button className="hidden md:flex items-center gap-2 bg-stone-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-stone-800 transition-all">
              <span>Login</span>
            </button>
            <button 
              className="md:hidden p-2 text-stone-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 text-stone-600 bg-stone-100 px-4 py-3 rounded-xl">
                <MapPin size={20} className="text-primary" />
                <span className="font-medium">New York, NY</span>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search for food..."
                  className="w-full bg-stone-100 border-none rounded-xl py-3 pl-12 pr-4 outline-none"
                />
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg">
                Login / Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
          {/* Desktop View Toggle for mobile */}
          <div className="block md:hidden mb-4 text-center">
            <button
              className="bg-stone-900 text-white px-4 py-2 rounded-full font-semibold shadow-md"
              onClick={() => setForceDesktopHero((v) => !v)}
            >
              {forceDesktopHero ? 'Switch to Mobile View' : 'Switch to Desktop View'}
            </button>
          </div>
          <div className={`relative min-h-150 ${forceDesktopHero ? 'flex flex-row items-stretch' : 'flex flex-col md:flex-row items-center md:items-stretch'}`}>
            <div className={`relative z-10 max-w-xl w-full ${forceDesktopHero ? 'md:w-1/2' : 'md:w-1/2'} flex flex-col justify-center`}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-bold mb-8"
              >
                <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                Fastest Delivery in Town
              </motion.div>
              
              <motion.h2 
                className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] text-stone-900 tracking-tighter"
              >
                {["Craving", "Something", "Delicious?"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, rotateX: -40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      delay: 0.2 + i * 0.1, 
                      duration: 0.8, 
                      ease: [0.215, 0.61, 0.355, 1] 
                    }}
                    className={`inline-block mr-4 ${i === 1 ? 'bg-linear-to-r from-amber-400 via-amber-300 to-purple-600 bg-clip-text text-transparent' : ''}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-stone-500 text-lg md:text-xl mb-10 max-w-md leading-relaxed"
              >
                Foodeez delivers happiness to your doorstep in minutes. Experience the premium taste with blazing fast delivery.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-wrap items-center gap-6 mb-12"
              >
                <motion.button 
                  onClick={() => {
                    const element = document.getElementById('featured-restaurants');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(251, 191, 36, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-linear-to-r from-amber-400 to-purple-600 text-stone-900 px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-amber-400/30 transition-all flex items-center gap-3"
                >
                  Order Now <ChevronRight size={22} />
                </motion.button>
                
              </motion.div>


            </div>
            
            {/* Floating Food Animation Section */}
            <div className="relative w-full md:w-1/2 mt-10 md:mt-0 flex items-center justify-center order-2 md:order-1">
              <div className="relative w-full h-[300px] sm:h-[350px] md:h-full">
                {/* Background Decorative Elements - Enhanced */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1], 
                    rotate: [0, 180, 360],
                    x: [0, 50, 0],
                    y: [0, -30, 0]
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute top-[10%] right-[20%] w-24 h-24 sm:w-32 sm:h-32 md:w-125 md:h-125 bg-amber-100/30 rounded-full blur-[60px] md:blur-[120px]" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1.3, 1, 1.3], 
                    rotate: [360, 180, 0],
                    x: [0, -40, 0],
                    y: [0, 40, 0]
                  }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-[10%] left-[10%] w-28 h-28 sm:w-36 sm:h-36 md:w-150 md:h-150 bg-amber-100/30 rounded-full blur-[70px] md:blur-[140px]" 
                />

                {/* Floating Ingredients - New dynamic elements */}
                {[
                  { icon: "🥬", delay: 0, x: -80, y: -70, size: "text-2xl sm:text-3xl md:text-4xl" },
                  { icon: "🍅", delay: 1, x: 90, y: -60, size: "text-3xl sm:text-4xl md:text-5xl" },
                  { icon: "🧀", delay: 2, x: -100, y: 40, size: "text-2xl sm:text-3xl md:text-4xl" },
                  { icon: "🧅", delay: 3, x: 80, y: 80, size: "text-xl sm:text-2xl md:text-3xl" },
                  { icon: "🥓", delay: 4, x: 0, y: -110, size: "text-2xl sm:text-3xl md:text-4xl" },
                  { icon: "🌶️", delay: 5, x: -40, y: 100, size: "text-xl sm:text-2xl md:text-3xl" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      x: [item.x, item.x + 20, item.x],
                      y: [item.y, item.y - 30, item.y],
                      rotate: [0, 15, -15, 0]
                    }}
                    transition={{ 
                      opacity: { delay: 0.5 + item.delay * 0.2 },
                      scale: { delay: 0.5 + item.delay * 0.2 },
                      x: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${item.size} filter drop-shadow-lg pointer-events-none`}
                  >
                    {item.icon}
                  </motion.div>
                ))}

                {/* Main Burger Plate - Enhanced with shadow and glow */}
                <motion.div
                  animate={{ 
                    y: [0, -35, 0],
                    rotate: [0, 4, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className="relative group">
                    {/* Outer Glow */}
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-3xl group-hover:bg-amber-400/30 transition-all duration-700" />
                    
                    <div className="relative p-6 bg-white rounded-full shadow-[0_60px_120px_-30px_rgba(0,0,0,0.2)] border-16 border-white overflow-hidden aspect-square flex items-center justify-center w-120 h-120">
                      <motion.img 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" 
                        alt="Burger"
                        className="w-full h-full object-cover rounded-full transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Interactive Badge */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-8 right-8 w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center text-stone-900 font-black text-xs text-center p-2 shadow-xl border-4 border-white z-30"
                      >
                        <div className="flex flex-col items-center">
                          <span>BEST</span>
                          <span>CHOICE</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Pizza Plate - Smaller and more offset */}
                <motion.div
                  animate={{ 
                    y: [0, 30, 0],
                    x: [0, 25, 0],
                    rotate: [15, 25, 15]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute top-[5%] right-[0%] z-30"
                >
                  <div className="p-4 bg-white rounded-full shadow-2xl border-10 border-white group cursor-pointer aspect-square flex items-center justify-center w-48 h-48">
                    <img 
                      src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" 
                      alt="Pizza"
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>

                {/* Drink Plate - Smaller and more offset */}
                <motion.div
                  animate={{ 
                    y: [0, -30, 0],
                    x: [0, -25, 0],
                    rotate: [-15, -5, -15]
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-[5%] left-[0%] z-30"
                >
                  <div className="p-4 bg-white rounded-full shadow-2xl border-10 border-white group cursor-pointer aspect-square flex items-center justify-center w-44 h-44">
                    <img 
                      src="https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&w=400&q=80" 
                      alt="Drink"
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-28 lg:py-40 overflow-hidden bg-linear-to-b from-stone-50 to-white">
  {/* Very subtle animated background glow (almost invisible on purpose) */}
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-1/4 top-1/4 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"
    />
  </div>

  <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
    {/* Headline */}
    <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5 text-stone-900"
      >
        Better food <span className="bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">for more people</span>
      </motion.h2>

      <div className="my-8 flex justify-center">
        <div className="w-2/3 h-2 bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 rounded-full shadow-md" />
      </div>
    </div>

    {/* Subscription Call-to-Action */}
    <div className="flex justify-center my-16">
      <div className="bg-gradient-to-r from-purple-500 via-pink-400 to-amber-400 p-1 rounded-3xl shadow-xl w-full max-w-3xl">
        <div className="bg-white rounded-3xl p-8 text-center">
          <p className="text-lg font-semibold text-stone-700">Join now and elevate your food experience!</p>
          <div className="mt-8">
            <p className="text-lg font-bold text-orange-500">
              Stop paying the "convenience tax" and enjoy the food you love without the hidden markups. Experience the exact same menu rates as the restaurant, delivered straight to your door at true dine-in prices.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Food Showcase – subtle scale-in on scroll, no crazy floating */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="group relative rounded-3xl overflow-hidden shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-500 aspect-4/3"
      >
        <img
          src="https://thumbs.dreamstime.com/b/quinoa-pumpkin-bowl-vegetarian-healthy-diet-food-concept-wooden-table-top-view-flat-lay-82743532.jpg"
          alt="Healthy quinoa & veggie bowl"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-lg font-bold">Fresh & Balanced</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="group relative rounded-3xl overflow-hidden shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-500 aspect-4/3"
      >
        <img
          src="https://thumbs.dreamstime.com/b/colorful-healthy-vegetarian-spread-quinoa-salad-grilled-vegetables-colorful-healthy-vegetarian-spread-quinoa-306717269.jpg"
          alt="Vibrant vegetarian platter"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-lg font-bold">Bold Flavors</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="group relative rounded-3xl overflow-hidden shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-500 aspect-4/3 sm:col-span-2 lg:col-span-1"
      >
        <img
          src="http://smartyhadaparty.com/cdn/shop/articles/flat-lay-fruits-grains-coconut-shell-tropical-vibes_1_0decc8f9-0c3a-4a90-a8d5-e276fb79210d.jpg?v=1748627048"
          alt="Tropical fruit & acai bowl"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <p className="text-lg font-bold">Exotic & Fresh</p>
        </div>
      </motion.div>
    </div>
  </div>
</section>
        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">What's on your mind?</h3>
            <button className="text-primary font-bold flex items-center gap-1 hover:underline">
              View all <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map((cat, i) => (
              <motion.div 
                key={cat.name}
                whileHover={{ y: -5 }}
                className="shrink-0 flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-3xl shadow-sm border border-stone-100 flex items-center justify-center text-3xl md:text-4xl group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                  {cat.icon}
                </div>
                <span className="font-semibold text-stone-600 group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Restaurants */}
        <section id="featured-restaurants" className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Top Rated Near You</h3>
            <button className="flex items-center gap-2 bg-white border border-stone-200 px-4 py-2 rounded-xl font-semibold text-stone-600 hover:bg-stone-50 transition-all">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESTAURANTS.map((res) => (
              <motion.div 
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/restaurant/${res.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden mb-4 shadow-md">
                  <img 
                    src={res.image} 
                    alt={res.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {res.isFreeDelivery && (
                    <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                      FREE DELIVERY
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{res.name}</h4>
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg text-sm font-bold">
                    <Star size={14} fill="currentColor" />
                    <span>{res.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-stone-500 text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{res.time}</span>
                  </div>
                  <span className="w-1 h-1 bg-stone-300 rounded-full" />
                  <span>{res.distance}</span>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {res.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-100 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="bg-stone-100 hover:bg-stone-200 text-stone-600 px-8 py-4 rounded-2xl font-bold transition-all">
              Load More Restaurants
            </button>
          </div>
        </section>

        {/* App Download Section - Full Width */}
        <section className="relative overflow-hidden bg-linear-to-br from-purple-700 via-purple-600 to-amber-400 py-24 md:py-32 text-white">
          {/* Dot Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', 
              backgroundSize: '32px 32px' 
            }} 
          />
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                Get The Foodeez <br /> App Now!
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-12 max-w-md leading-relaxed">
                Order on the go, track your delivery in real-time, and get exclusive app-only discounts and rewards.
              </p>
              
              <div className="flex flex-wrap gap-6">
                {/* App Store Button */}
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-4 shadow-xl hover:bg-stone-900 transition-all border border-amber-400/30"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold opacity-60 leading-none mb-1">Download on the</p>
                    <p className="text-xl font-bold leading-none">App Store</p>
                  </div>
                </motion.button>

                {/* Google Play Button */}
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-400 text-stone-900 px-8 py-4 rounded-2xl flex items-center gap-4 shadow-xl hover:bg-amber-300 transition-all border border-amber-300"
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 512 512" className="w-6 h-6">
                      <path fill="#4285F4" d="M46.8 44.2c-2.9 3.3-4.8 8.1-4.8 14.1v395.4c0 6 1.9 10.8 4.8 14.1l1.4 1.4L273.1 256.1V256V255.9L48.2 42.8l-1.4 1.4z"/>
                      <path fill="#EA4335" d="M352.7 335.7l-79.6-79.6V256V255.9l79.6-79.6 1.6.9 94.2 53.6c26.9 15.3 26.9 40.4 0 55.7l-94.2 53.6-1.6.9z"/>
                      <path fill="#FBBC04" d="M48.2 469.2l224.9-213.1V256V255.9L48.2 42.8c-4.8 5.4-7.7 13.2-7.7 22.2v382c0 9 2.9 16.8 7.7 22.2z"/>
                      <path fill="#34A853" d="M352.7 176.1l-79.6 79.8V256V256.1l79.6 79.8 1.6-.9 94.2-53.6c26.9-15.3 26.9-40.4 0-55.7l-94.2-53.6-1.6-.9z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-stone-400 leading-none mb-1">Get it on</p>
                    <p className="text-xl font-bold leading-none">Google Play</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            <div className="relative flex justify-center lg:justify-end">
              {/* Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: -5 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 15 }}
                className="relative z-20 w-64 md:w-80 aspect-1/2 bg-stone-900 rounded-[3rem] border-8 border-stone-800 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-800 rounded-b-2xl z-30" />
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80" 
                  className="w-full h-full object-cover opacity-80"
                  alt="App Interface"
                />
                <div className="absolute inset-0 bg-linear-to-t from-purple-600/80 via-transparent to-transparent flex items-end p-6">
                  <div className="w-full h-1/2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
                    <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4" />
                    <div className="space-y-3">
                      <div className="h-4 bg-white/20 rounded-full w-3/4" />
                      <div className="h-4 bg-white/10 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
              </motion.div>



              {/* Decorative Elements */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section - Auto Scrolling Marquee */}

      </main>

      {/* Footer */}
      <footer className="bg-stone-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <img src="/foodlogo.png" alt="Foodeez" className="h-12 w-auto" />
                <div>
                  <h1 className="text-2xl font-black tracking-tighter">FOODEEZ</h1>
                  <p className="text-[10px] text-stone-500 font-bold">by Palate Networks Private Limited</p>
                </div>
              </div>
              <p className="text-stone-500 mb-8 leading-relaxed">
                Delivering happiness to your doorstep. The fastest, most reliable food delivery service powered by Palate Networks Private Limited.
              </p>
              <div className="flex gap-4">
                {['FB', 'TW', 'IG'].map(social => (
                  <motion.div 
                    key={social} 
                    whileHover={{ y: -3, backgroundColor: '#FBBF24' }}
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer border border-white/10"
                  >
                    {social}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400 mb-8">Company</h5>
              <ul className="space-y-4 text-stone-500 font-medium">
                <li onClick={() => navigate('/about')} className="hover:text-white cursor-pointer transition-colors">About Palate Networks Private Limited</li>
                <li onClick={() => navigate('/careers')} className="hover:text-white cursor-pointer transition-colors">Careers</li>
                <li onClick={() => navigate('/blog')} className="hover:text-white cursor-pointer transition-colors">Blog</li>
                <li onClick={() => navigate('/contact')} className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400 mb-8">Legal</h5>
              <ul className="space-y-4 text-stone-500 font-medium">
                <li onClick={() => navigate('/terms-conditions')} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li onClick={() => navigate('/terms-conditions')} className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</li>
                <li onClick={() => navigate('/terms-conditions')} className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-white cursor-pointer transition-colors">Partner Program</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400 mb-8">Newsletter</h5>
              <p className="text-stone-500 mb-8 leading-relaxed">
                Get exclusive offers, delivery updates, and food recommendations straight to your inbox.
              </p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-400 transition-all"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-amber-400 hover:bg-amber-500 text-stone-900 px-4 rounded-xl transition-all flex items-center justify-center font-bold">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-stone-600 text-xs font-bold uppercase tracking-widest">
              <p>© 2026 Palate Networks Private Limited. Foodeez™ - All rights reserved.</p>
              <div className="flex gap-12">
                <span onClick={() => navigate('/terms-conditions')} className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span onClick={() => navigate('/terms-conditions')} className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</span>
                <span className="hover:text-white cursor-pointer transition-colors">Disclaimer</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
