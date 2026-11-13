import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { playSiliconeMutedThud, playBareMetalClank } from '../utils/audio';
import {
  ShieldCheck,
  ShieldAlert,
  Volume2,
  RotateCcw,
  Sparkles,
  Check,
  ZoomIn,
  Eye,
  Maximize2,
  Flame,
} from 'lucide-react';
import { ENGRAVING_FONTS, ENGRAVING_ICONS } from '../data/products';

export const BottleVisualizer: React.FC = () => {
  const {
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
    kit,
    activeViewAngle,
    setActiveViewAngle,
    soundEnabled,
  } = useCustomizer();

  const [isSimulatingClank, setIsSimulatingClank] = useState(false);
  const [lastClankResult, setLastClankResult] = useState<string | null>(null);

  const handleTestClank = () => {
    setIsSimulatingClank(true);
    if (selectedBoot) {
      if (soundEnabled) playSiliconeMutedThud();
      setLastClankResult('Silicone Cushioned: 28 dB (Whisper Silent & Zero Dents)');
    } else {
      if (soundEnabled) playBareMetalClank();
      setLastClankResult('Bare Stainless Steel: 86 dB (Loud Clatter & Dent Danger)');
    }

    setTimeout(() => {
      setIsSimulatingClank(false);
    }, 600);

    setTimeout(() => {
      setLastClankResult(null);
    }, 3800);
  };

  const currentFontObj = ENGRAVING_FONTS.find((f) => f.id === kit.engraving.font) || ENGRAVING_FONTS[0];
  const currentIconObj = ENGRAVING_ICONS.find((i) => i.id === kit.engraving.icon);

  const getTransform = () => {
    switch (activeViewAngle) {
      case 'boot-focus':
        return 'scale(1.4) translateY(-14%)';
      case 'cap-focus':
        return 'scale(1.45) translateY(18%)';
      case 'rotate':
        return 'scale(1) rotateY(180deg)';
      default:
        return 'scale(1) translateY(0%)';
    }
  };

  return (
    <div className="relative w-full h-full min-h-[540px] lg:min-h-[660px] flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-[#F7F6F2] via-[#F2EFE9] to-[#EBE7DF] rounded-3xl border border-stone-200/80 shadow-inner overflow-hidden select-none">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 55%, ${selectedBootVariant?.hex || selectedBottleVariant.hex}44 0%, transparent 70%)`,
        }}
      />

      {/* Top Floating Info Badges */}
      <div className="w-full flex items-center justify-between z-10 gap-2">
        {/* Status of Protector Boot */}
        {selectedBoot ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold backdrop-blur-md shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>4mm Shock Armor Active</span>
            {kit.engraving.protectionTier === 'ultra-bounce' && (
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold ml-1">
                Ultra Bounce
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-800 text-xs font-semibold backdrop-blur-md shadow-xs animate-pulse">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Unprotected Base (Risk of dents)</span>
          </div>
        )}

        {/* View Perspective Controls */}
        <div className="flex items-center space-x-1 bg-white/80 p-1 rounded-full border border-stone-200 backdrop-blur-md shadow-xs">
          <button
            onClick={() => setActiveViewAngle('front')}
            title="Full Bottle View"
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              activeViewAngle === 'front'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Full
          </button>
          <button
            onClick={() => setActiveViewAngle('boot-focus')}
            title="Inspect Silicone Boot Protector"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              activeViewAngle === 'boot-focus'
                ? 'bg-emerald-700 text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ZoomIn className="w-3 h-3" />
            Boot Focus
          </button>
          <button
            onClick={() => setActiveViewAngle('cap-focus')}
            title="Inspect Cap Lid"
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              activeViewAngle === 'cap-focus'
                ? 'bg-stone-900 text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Cap
          </button>
        </div>
      </div>

      {/* Main Bottle + Accessories Stage */}
      <div className="relative flex-1 w-full flex items-center justify-center my-4 z-10">
        <div
          className={`relative transition-all duration-500 ease-out flex flex-col items-center justify-center ${
            isSimulatingClank ? 'translate-y-4 rotate-1' : ''
          }`}
          style={{
            transform: getTransform(),
            transformOrigin: 'center center',
          }}
        >
          {/* Main Visualizer Container */}
          <div className="relative w-52 sm:w-60 h-[430px] sm:h-[470px] flex flex-col items-center justify-end">
            {/* 1. TOP CAP PROTECTOR LAYER */}
            {selectedCap && selectedCapVariant && (
              <div
                className="absolute top-0 z-30 flex flex-col items-center transition-all duration-300 drop-shadow-md group cursor-pointer"
                onClick={() => setActiveViewAngle('cap-focus')}
                title={`${selectedCap.title} (${selectedCapVariant.title})`}
              >
                <div className="relative w-28 h-24 flex items-center justify-center">
                  <img
                    src={selectedCapVariant.image}
                    alt={selectedCapVariant.title}
                    className="w-full h-full object-contain filter drop-shadow-sm transition-transform group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 rounded-full opacity-20 filter blur-sm pointer-events-none"
                    style={{ backgroundColor: selectedCapVariant.hex }}
                  />
                </div>
              </div>
            )}

            {/* CASETiFY-Style Signature Bezel / Ring Branding */}
            <div className="absolute top-20 z-20 w-32 h-4 rounded-full bg-stone-900 text-stone-300 text-[7px] font-mono font-bold tracking-widest flex items-center justify-center uppercase shadow-xs border border-white/20">
              <span>MONTiGO • CASETiFY SHIELD</span>
            </div>

            {/* 2. BOTTLE BODY LAYER */}
            <div
              className="relative z-10 w-36 sm:w-40 h-[340px] sm:h-[370px] rounded-t-2xl rounded-b-xl flex flex-col items-center justify-between shadow-2xl transition-all duration-500 overflow-hidden border border-white/20"
              style={{
                backgroundColor: selectedBottleVariant.hex,
                boxShadow: `0 20px 40px -15px rgba(0,0,0,0.3), inset 2px 0 4px rgba(255,255,255,0.4), inset -3px 0 6px rgba(0,0,0,0.3)`,
              }}
            >
              {/* Bottle Highlights */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/30 via-transparent to-black/30" />
              <div className="absolute left-3 top-0 bottom-0 w-2.5 bg-gradient-to-r from-white/40 to-transparent pointer-events-none" />

              {/* Neck Ring */}
              <div className="w-full h-6 border-b border-black/10 bg-white/10" />

              {/* Laser Engraving / Typography Customizer */}
              {kit.engraving.enabled && kit.engraving.text.trim().length > 0 && (
                <div
                  className={`absolute z-20 flex items-center justify-center pointer-events-none transition-all duration-300 ${
                    kit.engraving.orientation === 'vertical'
                      ? 'top-20 bottom-28 w-12 flex-col space-y-1 py-2'
                      : kit.engraving.orientation === 'diagonal'
                      ? 'top-28 w-32 -rotate-12 flex-row space-x-1.5'
                      : 'top-32 w-28 flex-row space-x-1.5 px-1'
                  }`}
                  style={{
                    color: ['#1F1F1F', '#006975', '#6B4C3E', '#8A2B3D'].includes(selectedBottleVariant.hex)
                      ? 'rgba(255, 255, 255, 0.88)'
                      : 'rgba(20, 20, 20, 0.78)',
                    textShadow: ['#1F1F1F', '#006975', '#6B4C3E', '#8A2B3D'].includes(selectedBottleVariant.hex)
                      ? '0 1px 2px rgba(0,0,0,0.6)'
                      : '0 1px 1px rgba(255,255,255,0.7)',
                  }}
                >
                  {currentIconObj && currentIconObj.symbol && (
                    <span className="text-sm opacity-90">{currentIconObj.symbol}</span>
                  )}
                  <span
                    className={`text-xs uppercase font-bold tracking-widest ${currentFontObj.css}`}
                    style={{
                      writingMode: kit.engraving.orientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
                      letterSpacing: kit.engraving.orientation === 'vertical' ? '0.35em' : '0.15em',
                      fontSize: kit.engraving.text.length > 10 ? '10px' : '11px',
                    }}
                  >
                    {kit.engraving.text}
                  </span>
                </div>
              )}

              {/* Bottom Bare Metal Base (when boot is removed) */}
              <div
                className={`w-full h-12 flex items-center justify-center transition-all duration-300 ${
                  selectedBoot ? 'opacity-0' : 'opacity-100 bg-gradient-to-b from-transparent to-stone-400/40'
                }`}
              >
                {!selectedBoot && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-stone-500/80 px-1 py-0.5 border border-dashed border-stone-400/50 rounded-sm">
                    No Boot
                  </span>
                )}
              </div>
            </div>

            {/* 3. SILICONE PROTECTOR BOOT LAYER */}
            {selectedBoot && selectedBootVariant ? (
              <div
                className="absolute -bottom-2 z-25 w-[164px] sm:w-[180px] h-[100px] flex flex-col items-center justify-end transition-all duration-300 group cursor-pointer drop-shadow-xl"
                onClick={() => setActiveViewAngle('boot-focus')}
                title={`${selectedBoot.title} (${selectedBootVariant.title})`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={selectedBootVariant.image}
                    alt={selectedBootVariant.title}
                    className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* CASETiFY Ultra Bounce Corner Air-Cushion Mockup indicator */}
                  {kit.engraving.protectionTier === 'ultra-bounce' && (
                    <>
                      <div className="absolute left-1 bottom-2 w-3.5 h-6 rounded-full bg-rose-500/30 border border-rose-400 animate-pulse" />
                      <div className="absolute right-1 bottom-2 w-3.5 h-6 rounded-full bg-rose-500/30 border border-rose-400 animate-pulse" />
                    </>
                  )}

                  {/* Matte Overlay */}
                  <div
                    className="absolute inset-x-2 bottom-1.5 h-16 rounded-b-2xl opacity-40 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)`,
                    }}
                  />

                  {/* Charm Badge Slot */}
                  {selectedBoot.slug.includes('charm') && (
                    <div className="absolute right-4 bottom-5 w-5 h-5 rounded-full bg-white/70 border border-stone-300 flex items-center justify-center shadow-xs">
                      {selectedCharm ? (
                        <img
                          src={selectedCharm.image}
                          alt="Charm"
                          className="w-4 h-4 object-contain animate-bounce"
                        />
                      ) : (
                        <span className="text-[8px] font-bold text-stone-600">✦</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {/* Base Drop Shadow */}
            <div
              className={`w-40 h-4 rounded-full transition-all duration-300 ${
                selectedBoot
                  ? 'bg-stone-900/25 blur-md scale-x-110'
                  : 'bg-stone-900/35 blur-sm scale-x-95'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Clank Feedback Banner */}
      {lastClankResult && (
        <div
          className={`absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-xl text-xs font-semibold shadow-lg backdrop-blur-md transition-all animate-bounce ${
            selectedBoot
              ? 'bg-emerald-900/90 text-emerald-100 border border-emerald-500/30'
              : 'bg-rose-900/90 text-rose-100 border border-rose-500/30'
          }`}
        >
          {lastClankResult}
        </div>
      )}

      {/* Bottom Controls Bar on Canvas */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 z-10 pt-2 border-t border-stone-200/60">
        <button
          onClick={handleTestClank}
          disabled={isSimulatingClank}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shadow-xs ${
            selectedBoot
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-stone-800 hover:bg-stone-900 text-amber-200'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSimulatingClank ? 'Testing Impact...' : 'Test Drop Sound'}</span>
          <span className="text-[10px] opacity-80 pl-1 border-l border-white/20">
            {selectedBoot ? 'Quiet Thud' : 'Loud Clank'}
          </span>
        </button>

        {/* Selected Swatches Overview */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-full border border-stone-200 backdrop-blur-xs">
            <span
              className="w-3 h-3 rounded-full border border-black/10 shadow-xs"
              style={{ backgroundColor: selectedBottleVariant.hex }}
              title={`Bottle: ${selectedBottleVariant.title}`}
            />
            <span className="text-[11px] font-medium text-stone-700">
              {selectedBottleVariant.title}
            </span>
          </div>

          {selectedBoot && selectedBootVariant ? (
            <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-full border border-emerald-200 backdrop-blur-xs">
              <span
                className="w-3 h-3 rounded-full border border-black/10 shadow-xs"
                style={{ backgroundColor: selectedBootVariant.hex }}
                title={`Boot: ${selectedBootVariant.title}`}
              />
              <span className="text-[11px] font-medium text-emerald-800">
                {selectedBootVariant.title} Boot
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-stone-200/80 px-2 py-1 rounded-full text-[10px] text-stone-600">
              <span>No Boot</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
