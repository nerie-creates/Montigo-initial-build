import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import {
  CASETIFY_COLAB_DROPS,
  PROTECTION_TIERS_DATA,
  CoLabDropItem,
} from '../data/products';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Flame,
  Smartphone,
  Headphones,
  RotateCcw,
  ShoppingBag,
  Leaf,
  Layers,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CasetifyCoLabView: React.FC = () => {
  const { setCurrentScreen, setBoot, setCap, setBottle, addToCart, showToast } = useCustomizer();
  const [selectedDrop, setSelectedDrop] = useState<CoLabDropItem>(CASETIFY_COLAB_DROPS[0]);
  const [selectedTier, setSelectedTier] = useState<string>('ultra-impact');

  const handleApplyCoLabToCustomizer = (drop: CoLabDropItem) => {
    // Look up bottle and apply
    setBottle('ace-medium');
    setBoot('cloud-boot-charm-mini-medium');
    setCap('ace-spout-cap');
    showToast(`Loaded "${drop.title}" into 3D Customiser!`);
    setCurrentScreen('customizer');
  };

  const handleAddCoLabBundle = (drop: CoLabDropItem) => {
    addToCart({
      id: `colab-bundle-${drop.id}-${Date.now()}`,
      type: 'colab_drop',
      title: `${drop.title} — Full Tech & Hydration Set`,
      subtitle: `Includes Phone Case + AirPods Case + Ace Bottle & Cloud Boot (${drop.artist})`,
      unitPrice: drop.bundlePrice,
      originalPrice: drop.originalPrice,
      quantity: 1,
      thumbnail: drop.bottleVariant.image,
      details: {
        bottleTitle: drop.title,
        bootTitle: drop.bootVariant.title,
        coLabArtist: drop.artist,
      },
    });

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-black text-white p-6 sm:p-10 border border-stone-800 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Inspired by CASETiFY Co-Lab Drops &amp; Tech Wardrobe</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Match Your Tech &amp; Hydration. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-300 to-indigo-300">
              Limited Edition Co-Lab Drops
            </span>
          </h1>

          <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
            Aesthetic synergy across your entire ecosystem. Match your Montigo silicone bottle boot with companion shockproof cases for iPhone, Galaxy, and AirPods.
          </p>

          {/* EcoShock & Sustainability Tag */}
          <div className="pt-2 flex flex-wrap gap-3 text-xs text-stone-300">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              Re/CASETiFY 65% Recycled Materials
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              EcoShock™ Corner Bumpers
            </span>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-600/20 via-indigo-600/20 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* PROTECTION TIERS SHOWCASE (Inspired by CASETiFY's Impact / Ultra Impact / Ultra Bounce) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
            Signature Drop Technology
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
            Choose Your Protection Tier
          </h2>
          <p className="text-xs text-stone-500">
            From sleek everyday slim bumpers to extreme 21-foot Ultra Bounce mountain armor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROTECTION_TIERS_DATA.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900 shadow-sm'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white px-2 py-0.5 rounded-md">
                      {tier.badge}
                    </span>
                    <span className="text-xs font-bold text-rose-600">
                      {tier.dropRating}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900">{tier.title}</h3>
                  <p className="text-xs text-stone-500">{tier.tagline}</p>

                  <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700">Tier Upgrade</span>
                  <span className="font-bold text-stone-900">
                    {tier.extraPrice === 0 ? 'Included' : `+$${tier.extraPrice.toFixed(2)} SGD`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEATURED CO-LAB DROPS GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Limited Artist Editions
            </span>
            <h2 className="text-xl font-bold text-stone-900">
              Featured Co-Lab Tech &amp; Hydration Sets
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASETIFY_COLAB_DROPS.map((drop) => {
            const isFeatured = selectedDrop.id === drop.id;

            return (
              <div
                key={drop.id}
                className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-xl ${
                  isFeatured ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-200'
                }`}
              >
                {/* Visual Header Mockup */}
                <div className="relative h-60 bg-gradient-to-b from-stone-100 to-stone-200/80 p-6 flex items-center justify-center overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-white shadow-xs">
                    {drop.badge}
                  </span>
                  <span className="absolute top-4 right-4 z-10 text-[10px] font-mono font-bold text-stone-500 bg-white/80 px-2 py-0.5 rounded-md">
                    {drop.edition}
                  </span>

                  {/* Tri-Device Mockup: Phone Case + Bottle + Earbuds */}
                  <div className="relative flex items-center justify-center gap-3">
                    {/* Phone Case */}
                    <div className="w-16 h-28 rounded-xl bg-white p-1 shadow-lg border border-stone-300 flex flex-col items-center justify-between relative transform -rotate-6 transition-transform group-hover:-rotate-12">
                      <div className="w-6 h-6 rounded-md bg-stone-900 border border-black flex items-center justify-center text-[6px] text-white font-mono font-bold">
                        RING
                      </div>
                      <div className="w-full h-8 rounded-sm bg-gradient-to-b from-transparent to-black/10" />
                    </div>

                    {/* Bottle */}
                    <div className="w-20 h-40 flex flex-col items-center justify-end relative z-10 drop-shadow-xl transform group-hover:scale-105 transition-transform">
                      <img
                        src={drop.bottleVariant.image}
                        alt={drop.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Earbuds Case */}
                    <div className="w-12 h-14 rounded-xl bg-stone-900 p-1 shadow-md flex items-center justify-center transform rotate-6 transition-transform group-hover:rotate-12">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-[7px] text-emerald-300 font-bold">
                        BUDS
                      </div>
                    </div>
                  </div>

                  {/* Ambient Backdrop Color */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none filter blur-2xl"
                    style={{ backgroundColor: drop.bottleVariant.hex }}
                  />
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                      {drop.artist}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                      {drop.title}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2">
                      {drop.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {drop.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase font-bold">
                          Bundle: Bottle + Phone + Buds
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-extrabold text-stone-900">
                            ${drop.bundlePrice.toFixed(2)} SGD
                          </span>
                          <span className="text-xs text-stone-400 line-through">
                            ${drop.originalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Save 27%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleApplyCoLabToCustomizer(drop)}
                        className="py-2.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all text-center"
                      >
                        Try in Customiser
                      </button>

                      <button
                        onClick={() => handleAddCoLabBundle(drop)}
                        className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Bundle</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
