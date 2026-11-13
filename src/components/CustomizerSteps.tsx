import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import {
  BOTTLE_CATALOG,
  BOOT_PROTECTORS,
  CAP_PROTECTORS,
  ENGRAVING_FONTS,
  ENGRAVING_ICONS,
  PROTECTION_TIERS_DATA,
  GADGET_PROTECTORS,
  ACCESSORY_STORE_ITEMS,
} from '../data/products';
import {
  ShieldCheck,
  Check,
  Sparkles,
  ShoppingBag,
  RotateCw,
  Shuffle,
  Info,
  Type,
  Smile,
  Tag,
  Sliders,
  Smartphone,
  Headphones,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CustomizerSteps: React.FC = () => {
  const {
    kit,
    setKit,
    selectedBottle,
    selectedBottleVariant,
    selectedBoot,
    selectedBootVariant,
    selectedCap,
    selectedCapVariant,
    selectedCharm,
    selectedStrap,
    selectedEarbudProtector,
    selectedPhoneProtector,
    setBottle,
    setBottleVariant,
    setBoot,
    setBootVariant,
    setCap,
    setCapVariant,
    setCharm,
    setStrap,
    setEarbudProtector,
    setPhoneProtector,
    setEngravingText,
    setEngravingFont,
    setEngravingIcon,
    setEngravingOrientation,
    pricing,
    addCurrentKitToCart,
    randomizeKit,
  } = useCustomizer();

  const [activeStep, setActiveStep] = useState<'bottle' | 'boot' | 'cap' | 'engrave' | 'tech-wardrobe'>('boot');

  const handleAddToCartWithConfetti = () => {
    addCurrentKitToCart();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
  };

  const stepsList = [
    { id: 'bottle', title: '1. Bottle', subtitle: selectedBottleVariant.title },
    {
      id: 'boot',
      title: '2. Protection & Boot',
      subtitle: selectedBootVariant ? selectedBootVariant.title : 'No Boot',
      highlight: true,
    },
    { id: 'cap', title: '3. Cap & Lid', subtitle: selectedCapVariant ? selectedCapVariant.title : 'Standard' },
    {
      id: 'engrave',
      title: '4. CASETiFY Typo',
      subtitle: kit.engraving.enabled && kit.engraving.text ? kit.engraving.text : 'None',
    },
    {
      id: 'tech-wardrobe',
      title: '5. Match Tech',
      subtitle: selectedPhoneProtector || selectedEarbudProtector ? 'Gadgets Added' : 'Phone & Buds',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Step Navigation Bar */}
      <div className="flex items-center overflow-x-auto p-2 bg-stone-50 border-b border-stone-200 scrollbar-none gap-1">
        {stepsList.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id as typeof activeStep)}
              className={`flex-1 min-w-[100px] py-2 px-3 rounded-2xl text-left transition-all ${
                isActive
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200/80 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs">{step.title}</span>
                {step.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <div className="text-[11px] font-normal text-stone-500 truncate mt-0.5">
                {step.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Content Container */}
      <div className="flex-1 p-5 sm:p-6 overflow-y-auto max-h-[480px] lg:max-h-[520px]">
        {/* STEP 1: BOTTLE BASE SELECTION */}
        {activeStep === 'bottle' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-stone-900">Select Bottle Base</h3>
                <span className="text-xs font-semibold text-stone-500">
                  {selectedBottle.size} • {selectedBottle.volume}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Choose the insulated bottle body and color finish.
              </p>
            </div>

            {/* Bottle Series Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Bottle Series Collection
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BOTTLE_CATALOG.map((b) => {
                  const isSelected = selectedBottle.id === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBottle(b.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50/70 hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{b.title}</div>
                      <div
                        className={`text-[11px] mt-1 ${
                          isSelected ? 'text-stone-300' : 'text-stone-500'
                        }`}
                      >
                        ${b.basePrice.toFixed(2)} SGD • {b.variants.length} colors
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Selected Color: <strong className="text-stone-900">{selectedBottleVariant.title}</strong>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {selectedBottle.variants.map((v) => {
                  const isChosen = selectedBottleVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setBottleVariant(v.id)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                        isChosen
                          ? 'border-stone-900 bg-stone-100/90 ring-1 ring-stone-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/15 shadow-inner shrink-0"
                        style={{ backgroundColor: v.hex }}
                      />
                      <span className="text-xs font-medium text-stone-800 truncate">
                        {v.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PROTECTOR BOOT & PROTECTION TIER (CASETiFY INSPIRED) */}
        {activeStep === 'boot' && (
          <div className="space-y-6">
            {/* CASETiFY Protection Tiers Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between">
                <span>CASETiFY-Style Drop Tier:</span>
                <span className="text-rose-600 font-bold">Military-Grade Drop Tested</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {PROTECTION_TIERS_DATA.map((tier) => {
                  const isSelected = (kit.engraving.protectionTier || 'impact') === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() =>
                        setKit((prev) => ({
                          ...prev,
                          engraving: { ...prev.engraving, protectionTier: tier.id as any },
                        }))
                      }
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-bold'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="text-[11px] font-bold truncate">{tier.title.split(' ')[0]}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-rose-300' : 'text-rose-600'}`}>
                        {tier.dropRating.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle boot */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-900">Equip Silicone Boot</span>
                <span className="text-[11px] text-stone-500">
                  {selectedBoot ? 'Included in kit ($8.90 - $10.90)' : 'Bare base'}
                </span>
              </div>
              <button
                onClick={() => {
                  if (selectedBoot) setBoot(null);
                  else setBoot(BOOT_PROTECTORS[0].id);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  selectedBoot ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    selectedBoot ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {selectedBoot && (
              <>
                {/* Boot Models */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Choose Protector Style
                  </label>
                  <div className="space-y-2">
                    {BOOT_PROTECTORS.map((boot) => {
                      const isSelected = selectedBoot.id === boot.id;
                      return (
                        <div
                          key={boot.id}
                          onClick={() => setBoot(boot.id)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={boot.thumbnail}
                                alt={boot.title}
                                className="w-9 h-9 object-contain p-1 rounded-xl bg-stone-100"
                              />
                              <div>
                                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                                  <span>{boot.title}</span>
                                  {boot.badge && (
                                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                                      {boot.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                                  {boot.tagline}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-stone-900 shrink-0">
                              +${boot.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Boot Color: <strong className="text-stone-900">{selectedBootVariant?.title}</strong>
                    </label>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {selectedBoot.variants.map((v) => {
                      const isChosen = selectedBootVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setBootVariant(v.id)}
                          className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                            isChosen
                              ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600 shadow-xs'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-black/15 shadow-inner mb-1"
                            style={{ backgroundColor: v.hex }}
                          />
                          <span className="text-[10px] font-medium text-stone-800 truncate w-full">
                            {v.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 3: CAP & LID SELECTION */}
        {activeStep === 'cap' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-stone-900">Choose Cap Protector &amp; Spout</h3>
              <p className="text-xs text-stone-500 mt-1">
                All caps feature food-grade silicone seals and leak-proof insulation.
              </p>
            </div>

            <div className="space-y-2">
              {CAP_PROTECTORS.map((cap) => {
                const isSelected = selectedCap?.id === cap.id;
                return (
                  <div
                    key={cap.id}
                    onClick={() => setCap(cap.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={cap.thumbnail}
                          alt={cap.title}
                          className="w-9 h-9 object-contain p-1 rounded-xl bg-stone-100"
                        />
                        <div>
                          <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                            <span>{cap.title}</span>
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                            {cap.tagline}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-stone-900 shrink-0">
                        +${cap.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedCap && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Cap Color: <strong className="text-stone-900">{selectedCapVariant?.title}</strong>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {selectedCap.variants.map((v) => {
                    const isChosen = selectedCapVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setCapVariant(v.id)}
                        className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                          isChosen
                            ? 'border-stone-900 bg-stone-100 ring-1 ring-stone-900 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-black/15 shadow-inner mb-1"
                          style={{ backgroundColor: v.hex }}
                        />
                        <span className="text-[10px] font-medium text-stone-800 truncate w-full">
                          {v.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: CASETiFY CUSTOMIZER TYPOGRAPHY & MONOGRAM */}
        {activeStep === 'engrave' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-stone-900">CASETiFY Custom Studio</h3>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  FREE
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Personalized name, monogram, and layout orientations.
              </p>
            </div>

            {/* Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Text or Monogram
              </label>
              <input
                type="text"
                maxLength={12}
                value={kit.engraving.text}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="e.g. EMMA, 2026, ALEX"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm font-semibold tracking-wider uppercase bg-stone-50/50"
              />
            </div>

            {/* Layout Orientation */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Layout Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'vertical', label: 'Vertical Stack' },
                  { id: 'horizontal', label: 'Center Block' },
                  { id: 'diagonal', label: 'Slanted Dynamic' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setEngravingOrientation(l.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      kit.engraving.orientation === l.id
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fonts */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Font Typography
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ENGRAVING_FONTS.map((font) => {
                  const isSelected = kit.engraving.font === font.id;
                  return (
                    <button
                      key={font.id}
                      onClick={() => setEngravingFont(font.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className={`text-xs ${font.css}`}>{font.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Icons */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Add Symbol
              </label>
              <div className="flex flex-wrap gap-2">
                {ENGRAVING_ICONS.map((icon) => {
                  const isSelected = kit.engraving.icon === icon.id;
                  return (
                    <button
                      key={icon.id}
                      onClick={() => setEngravingIcon(icon.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{icon.symbol ? `${icon.symbol} ` : ''}</span>
                      <span>{icon.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: TECH WARDROBE (CASETiFY MATCH YOUR GADGETS) */}
        {activeStep === 'tech-wardrobe' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                <span>CASETiFY Tech Wardrobe Synergy</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 mt-0.5">
                Match Your Phone, Earbuds &amp; Bottle
              </h3>
              <p className="text-xs text-stone-500">
                Complete your everyday carry with color-synchronized tech armor.
              </p>
            </div>

            {/* Companion Gadgets */}
            <div className="space-y-3">
              {/* Phone Case Add-on */}
              <div
                onClick={() => setPhoneProtector(selectedPhoneProtector ? null : 'gadget-phone-armor')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedPhoneProtector
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-stone-800" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>Color-Matched Phone Bumper Armor</span>
                        <span className="text-[9px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full font-bold">
                          MagSafe
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Matches your {selectedBootVariant?.title || 'bottle'} colorway
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-stone-900">+${24.90}</span>
                    <span
                      className={`text-[10px] font-bold block ${
                        selectedPhoneProtector ? 'text-emerald-700' : 'text-stone-400'
                      }`}
                    >
                      {selectedPhoneProtector ? '✓ Included' : '+ Add'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Earbuds Case Add-on */}
              <div
                onClick={() => setEarbudProtector(selectedEarbudProtector ? null : 'gadget-earbuds-silicone')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedEarbudProtector
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-stone-800" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>AirPods / Earbuds Silicone Case</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
                          Carabiner
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Alloy clip hooks onto bottle handle or bag
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-stone-900">+${14.90}</span>
                    <span
                      className={`text-[10px] font-bold block ${
                        selectedEarbudProtector ? 'text-emerald-700' : 'text-stone-400'
                      }`}
                    >
                      {selectedEarbudProtector ? '✓ Included' : '+ Add'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Utility Rope Lanyard Add-on */}
              <div
                onClick={() => setStrap(selectedStrap ? null : 'store-casetify-utility-strap')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  selectedStrap
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-stone-800" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>Utility Crossbody Rope Lanyard</span>
                        <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                          Iconic
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        8mm thick rope with dual quick-release carabiners
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-stone-900">+${18.90}</span>
                    <span
                      className={`text-[10px] font-bold block ${
                        selectedStrap ? 'text-emerald-700' : 'text-stone-400'
                      }`}
                    >
                      {selectedStrap ? '✓ Included' : '+ Add'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col gap-3">
        {pricing.hasBundleDiscount && (
          <div className="flex items-center justify-between text-xs font-medium text-emerald-800 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full Shield Bundle (Bottle + Boot + Cap)</span>
            </span>
            <span className="font-bold text-emerald-700">
              Save 10% (-${pricing.bundleDiscountAmount.toFixed(2)})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-stone-500">Total Custom Kit</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-stone-900 tracking-tight">
                ${pricing.finalTotal.toFixed(2)} SGD
              </span>
              {pricing.hasBundleDiscount && (
                <span className="text-xs line-through text-stone-400">
                  ${pricing.rawTotal.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={randomizeKit}
              title="Surprise me with randomized styling"
              className="p-2.5 rounded-2xl border border-stone-300 hover:bg-stone-200/60 text-stone-700 transition-colors"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={handleAddToCartWithConfetti}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Shield Kit to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
