import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { COLOR_PRESETS, ColorPreset } from '../data/products';
import {
  Palette,
  Sparkles,
  ArrowRight,
  Shuffle,
  Check,
  Layers,
  Sliders,
  Copy,
} from 'lucide-react';

export const PaletteLabView: React.FC = () => {
  const { applyPreset, setCurrentScreen, showToast, randomizeKit } = useCustomizer();
  const [activeFilter, setActiveFilter] = useState<'all' | 'pastel' | 'bold' | 'earthy'>('all');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleApplyPreset = (preset: ColorPreset) => {
    applyPreset(preset);
    setCurrentScreen('customizer');
  };

  const handleCopyHex = (hex: string) => {
    try {
      navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      showToast(`Copied ${hex} to clipboard`);
      setTimeout(() => setCopiedHex(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-800 text-xs font-semibold border border-indigo-500/20">
          <Palette className="w-3.5 h-3.5 text-indigo-600" />
          <span>Color Harmony &amp; Mix-and-Match Studio</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Trending Color Pairings <br />
          <span className="text-indigo-600">Bottle + Protector Boot + Cap</span>
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          Need inspiration? Explore hand-curated color trios designed by MONTiGO stylists. Tap any preset to immediately load it into your live customiser.
        </p>

        {/* Action Button */}
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => {
              randomizeKit();
              setCurrentScreen('customizer');
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-md hover:bg-stone-800 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Generate Random Harmony</span>
          </button>
        </div>
      </div>

      {/* Preset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLOR_PRESETS.map((preset) => {
          const [bottleHex, bootHex, capHex] = preset.previewColors;

          return (
            <div
              key={preset.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Top Visual Swatch Banner */}
              <div className="relative h-44 p-6 flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
                {/* 3 Circular Interlocking Color Orbs */}
                <div className="relative flex items-center justify-center -space-x-4">
                  {/* Bottle Color */}
                  <div
                    className="w-16 h-16 rounded-full border-2 border-white shadow-md flex items-center justify-center z-10 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: bottleHex }}
                    title={`Bottle: ${preset.bottleVariantTitle}`}
                  >
                    <span className="text-[9px] font-bold text-white/90 drop-shadow-xs">Bottle</span>
                  </div>

                  {/* Boot Protector Color */}
                  <div
                    className="w-18 h-18 rounded-full border-2 border-white shadow-lg flex items-center justify-center z-20 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: bootHex }}
                    title={`Boot: ${preset.bootVariantTitle}`}
                  >
                    <span className="text-[10px] font-extrabold text-white/90 drop-shadow-xs">Boot</span>
                  </div>

                  {/* Cap Color */}
                  <div
                    className="w-14 h-14 rounded-full border-2 border-white shadow-md flex items-center justify-center z-10 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: capHex }}
                    title={`Cap: ${preset.capVariantTitle}`}
                  >
                    <span className="text-[9px] font-bold text-white/90 drop-shadow-xs">Cap</span>
                  </div>
                </div>

                {/* Subtle Backdrop Tint */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none filter blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${bottleHex}, ${bootHex}, ${capHex})`,
                  }}
                />
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-indigo-600 transition-colors">
                    {preset.name}
                  </h3>
                  <p className="text-xs text-stone-500">{preset.tagline}</p>
                </div>

                {/* Color Swatch Specs */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-medium">Bottle:</span>
                    <span className="font-bold text-stone-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bottleHex }} />
                      {preset.bottleVariantTitle}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-medium">Boot Protector:</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bootHex }} />
                      {preset.bootVariantTitle}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-medium">Cap Lid:</span>
                    <span className="font-bold text-stone-800 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: capHex }} />
                      {preset.capVariantTitle}
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => handleApplyPreset(preset)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs group-hover:bg-indigo-600"
                >
                  <span>Apply This Style to Customiser</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide on Color Matching */}
      <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-200 text-stone-800">
        <h3 className="text-base font-bold mb-2">MONTiGO Color Styling Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
          <div className="p-4 bg-white rounded-2xl border border-stone-200">
            <h4 className="font-bold text-stone-900 mb-1">1. The Monochromatic Accent</h4>
            <p>Pairing tones in the same color family (like Scandi Sage with Pea Green Boot) creates a calm, high-end Scandi look.</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-stone-200">
            <h4 className="font-bold text-stone-900 mb-1">2. High Contrast Pop</h4>
            <p>A dark bottle (Midnight Black) accented with a vibrant boot (Frozen Teal or Butter Yellow) draws attention to the protective base.</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-stone-200">
            <h4 className="font-bold text-stone-900 mb-1">3. Soft Pastels Blend</h4>
            <p>Mix and match Linen Lilac with Cloud Sky Blue and Misty Lilac spout for a dreamy, aesthetic daily carry.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
