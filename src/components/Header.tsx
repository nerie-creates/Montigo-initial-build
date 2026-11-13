import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { AppScreen } from '../types';
import {
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Volume2,
  VolumeX,
  Palette,
  Layers,
  Activity,
  Truck,
  Users,
  Building2,
  FileSpreadsheet,
  Flame,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    soundEnabled,
    toggleSound,
    cartCount,
    cartTotal,
    freeShippingThreshold,
    freeShippingProgress,
  } = useCustomizer();

  const navItems: { id: AppScreen; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'customizer',
      label: 'Customiser',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-600" />,
      badge: 'Live 3D',
    },
    {
      id: 'colab-studio',
      label: 'Co-Lab Drops',
      icon: <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />,
      badge: 'CASETiFY',
    },
    {
      id: 'persona-kits',
      label: 'Lifestyle Personas',
      icon: <Users className="w-3.5 h-3.5 text-indigo-600" />,
      badge: '5 Kits',
    },
    {
      id: 'b2b-corporate',
      label: 'B2B & Schools',
      icon: <Building2 className="w-3.5 h-3.5 text-blue-600" />,
      badge: 'Bulk',
    },
    {
      id: 'catalog',
      label: 'Protector Shop',
      icon: <Layers className="w-3.5 h-3.5 text-slate-600" />,
    },
    {
      id: 'protection-lab',
      label: 'Drop Lab',
      icon: <Activity className="w-3.5 h-3.5 text-amber-600" />,
    },
    {
      id: 'business-canvas',
      label: 'Business Canvas',
      icon: <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />,
      badge: 'Strategy',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-medium">
              <Flame className="w-3 h-3 text-rose-400" /> CASETiFY Tech Wardrobe
            </span>
            <span className="text-stone-300">
              Match your Montigo Bottle Boot with Phone &amp; Earbuds Armor. EcoShock™ Drop Tested &amp; 1-Year Warranty.
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] sm:text-xs text-stone-300">
            <div className="hidden md:flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {cartTotal >= freeShippingThreshold ? (
                  <strong className="text-emerald-400">You unlocked Free Shipping!</strong>
                ) : (
                  <>
                    Add <strong>${(freeShippingThreshold - cartTotal).toFixed(2)}</strong> for Free Delivery
                  </>
                )}
              </span>
            </div>
            <div className="w-16 h-1.5 bg-stone-700 rounded-full overflow-hidden hidden md:block">
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-2.5 cursor-pointer shrink-0" onClick={() => setCurrentScreen('customizer')}>
          <div className="flex items-center gap-1.5">
            <img
              src="https://getmontigo.com/cdn/shop/files/Montigo_Logo-03_100x_f6dff8ee-efde-482c-a760-eeb6cfa08251.png"
              alt="MONTiGO"
              className="h-5 sm:h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-stone-900 font-sans">
              MONT<span className="text-emerald-600">i</span>GO
            </span>
          </div>
          <span className="hidden xl:inline-block h-4 w-px bg-stone-300" />
          <span className="hidden xl:inline-block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Shield &amp; Style • Drinkware &amp; Tech Armor
          </span>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 bg-stone-100/80 p-1 rounded-full border border-stone-200">
          {navItems.map((tab) => {
            const isActive = currentScreen === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentScreen(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold ${
                      isActive ? 'bg-emerald-500 text-stone-950' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Acoustic feedback enabled' : 'Acoustic feedback muted'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              soundEnabled
                ? 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                : 'bg-stone-50 text-stone-400 border-stone-200 hover:bg-stone-100'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline text-[11px]">Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline text-[11px]">Muted</span>
              </>
            )}
          </button>

          <button
            onClick={() => setCurrentScreen('cart')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentScreen === 'cart'
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-stone-900 text-white hover:bg-stone-800 shadow-xs'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Bag</span>
            <span className="font-bold text-emerald-300 border-l border-stone-700 pl-1.5">
              ${cartTotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Screen Selector (Sub-bar) */}
      <div className="lg:hidden flex items-center overflow-x-auto py-2 px-3 border-t border-stone-200/80 bg-stone-50/90 gap-1.5 scrollbar-none">
        {navItems.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentScreen(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'bg-white text-stone-700 border border-stone-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] bg-emerald-500/20 text-emerald-700 px-1 rounded-sm">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
