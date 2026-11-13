import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { ACCESSORY_STORE_ITEMS, BOOT_PROTECTORS, CAP_PROTECTORS } from '../data/products';
import {
  ShieldCheck,
  Star,
  Sparkles,
  ShoppingBag,
  Filter,
  Check,
  ArrowRight,
  Eye,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProtectorCatalogView: React.FC = () => {
  const {
    setCurrentScreen,
    setBoot,
    setBootVariant,
    setCap,
    setCapVariant,
    addToCart,
    showToast,
  } = useCustomizer();

  const [activeCategory, setActiveCategory] = useState<'All' | 'Boot' | 'Cap' | 'Charm' | 'Strap' | 'Bag'>('All');
  const [activeCompatibility, setActiveCompatibility] = useState<string>('All');
  const [selectedCardColors, setSelectedCardColors] = useState<Record<string, number>>({});

  const categories = ['All', 'Boot', 'Cap', 'Charm', 'Strap', 'Bag'] as const;

  const filteredItems = ACCESSORY_STORE_ITEMS.filter((item) => {
    if (activeCategory !== 'All' && item.category !== activeCategory) return false;
    if (activeCompatibility !== 'All') {
      if (!item.compatibility.toLowerCase().includes(activeCompatibility.toLowerCase())) return false;
    }
    return true;
  });

  const handleColorSelect = (itemId: string, index: number) => {
    setSelectedCardColors((prev) => ({ ...prev, [itemId]: index }));
  };

  const handleTryOnInCustomizer = (item: (typeof ACCESSORY_STORE_ITEMS)[0]) => {
    const colorIndex = selectedCardColors[item.id] || 0;
    const chosenColor = item.colors[colorIndex];

    if (item.category === 'Boot') {
      // Find matching boot in BOOT_PROTECTORS
      const match = BOOT_PROTECTORS.find((b) => item.title.toLowerCase().includes(b.title.toLowerCase())) || BOOT_PROTECTORS[0];
      const matchVar = match.variants.find((v) => v.title.toLowerCase() === chosenColor.title.toLowerCase()) || match.variants[0];
      setBoot(match.id, matchVar.id);
      showToast(`Fitted ${chosenColor.title} ${match.title} in Customiser!`);
    } else if (item.category === 'Cap') {
      const match = CAP_PROTECTORS.find((c) => item.title.toLowerCase().includes(c.title.toLowerCase())) || CAP_PROTECTORS[0];
      const matchVar = match.variants.find((v) => v.title.toLowerCase() === chosenColor.title.toLowerCase()) || match.variants[0];
      setCap(match.id, matchVar.id);
      showToast(`Equipped ${chosenColor.title} ${match.title} in Customiser!`);
    }

    setCurrentScreen('customizer');
  };

  const handleAddStandaloneToCart = (item: (typeof ACCESSORY_STORE_ITEMS)[0]) => {
    const colorIndex = selectedCardColors[item.id] || 0;
    const chosenColor = item.colors[colorIndex];

    addToCart({
      id: `${item.id}-${chosenColor.title}-${Date.now()}`,
      type: 'standalone_accessory',
      title: item.title,
      subtitle: `Color: ${chosenColor.title} • ${item.compatibility}`,
      unitPrice: item.price,
      originalPrice: item.price,
      quantity: 1,
      thumbnail: chosenColor.image || item.image,
      details: {
        bootTitle: item.category === 'Boot' ? item.title : undefined,
        bootColor: item.category === 'Boot' ? chosenColor.title : undefined,
        capTitle: item.category === 'Cap' ? item.title : undefined,
        capColor: item.category === 'Cap' ? chosenColor.title : undefined,
      },
    });

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner for Protector Store */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-6 sm:p-10 border border-stone-800 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official MONTiGO Accessories Protectors</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Armor Your Bottle. <br />
            <span className="text-emerald-400">Silicone Boots, Charms &amp; Caps</span>
          </h1>
          <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
            Engineered from heavy-duty food-grade silicone. Prevent loud clanking, dent damage, and scuffs with anti-slip base boots, modular charm sets, and covered hygiene caps.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentScreen('customizer')}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open 3D Customiser</span>
            </button>
            <button
              onClick={() => setCurrentScreen('protection-lab')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all"
            >
              <span>See Drop-Test Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Decorative Floating Protector Graphic */}
        <div className="absolute -right-6 -bottom-8 w-64 h-64 opacity-25 sm:opacity-40 pointer-events-none">
          <img
            src="https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400"
            alt="Boot Protector"
            className="w-full h-full object-contain filter drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Category and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center overflow-x-auto gap-1.5 scrollbar-none pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? 'All Protectors' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Compatibility Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Size:
          </span>
          <select
            value={activeCompatibility}
            onChange={(e) => setActiveCompatibility(e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
          >
            <option value="All">All Bottle Fits</option>
            <option value="Ace Medium">Ace Medium (18oz / 530ml)</option>
            <option value="Ace Mini">Ace Mini (14oz)</option>
            <option value="Universal">Universal Fit</option>
          </select>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const currentColorIndex = selectedCardColors[item.id] || 0;
          const currentColor = item.colors[currentColorIndex] || item.colors[0];

          return (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Image Stage */}
              <div className="relative h-56 bg-gradient-to-b from-stone-50 to-stone-100/60 flex items-center justify-center p-6 overflow-hidden">
                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white shadow-xs">
                    {item.badge}
                  </span>
                )}

                {/* Compatibility Tag */}
                <span className="absolute top-4 right-4 z-10 px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/80 text-stone-600 border border-stone-200">
                  {item.compatibility.split('/')[0]}
                </span>

                {/* Product Cutout Image */}
                <img
                  src={currentColor.image || item.image}
                  alt={item.title}
                  className="w-36 h-36 object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                />

                {/* Ambient Soft Glow */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none filter blur-2xl"
                  style={{ backgroundColor: currentColor.hex }}
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      {item.category} Protector
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-stone-400">({item.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Color Swatch Selector */}
                {item.colors.length > 1 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-500">Color:</span>
                      <span className="font-semibold text-stone-800">{currentColor.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.colors.map((c, idx) => (
                        <button
                          key={c.title}
                          onClick={() => handleColorSelect(item.id, idx)}
                          title={c.title}
                          className={`w-5 h-5 rounded-full border transition-all ${
                            currentColorIndex === idx
                              ? 'border-stone-900 ring-2 ring-emerald-500 scale-110'
                              : 'border-black/20 hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Price and Action Buttons */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">Price</span>
                    <span className="text-base font-extrabold text-stone-900">
                      ${item.price.toFixed(2)} SGD
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Try On in Customiser (if Boot or Cap) */}
                    {(item.category === 'Boot' || item.category === 'Cap') && (
                      <button
                        onClick={() => handleTryOnInCustomizer(item)}
                        title="Try on bottle in 3D customiser"
                        className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">Try On</span>
                      </button>
                    )}

                    {/* Add to Bag */}
                    <button
                      onClick={() => handleAddStandaloneToCart(item)}
                      className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
