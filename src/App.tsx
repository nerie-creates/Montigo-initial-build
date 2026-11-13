/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CustomizerProvider, useCustomizer } from './context/CustomizerContext';
import { Header } from './components/Header';
import { BottleVisualizer } from './components/BottleVisualizer';
import { CustomizerSteps } from './components/CustomizerSteps';
import { ProtectorCatalogView } from './components/ProtectorCatalogView';
import { ProtectionLabView } from './components/ProtectionLabView';
import { PaletteLabView } from './components/PaletteLabView';
import { PersonaKitsView } from './components/PersonaKitsView';
import { B2BCorporateView } from './components/B2BCorporateView';
import { BusinessCanvasView } from './components/BusinessCanvasView';
import { CasetifyCoLabView } from './components/CasetifyCoLabView';
import { CartView } from './components/CartView';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  Heart,
  Droplet,
  Award,
  Flame,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentScreen, toastMessage } = useCustomizer();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-stone-900 selection:bg-emerald-200">
      <Header />

      {/* Main Screen Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentScreen === 'customizer' && (
          <div className="space-y-6">
            {/* Customizer Header Intro */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-semibold border border-emerald-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interactive 3D Configurator</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Customise Your Ace Bottle &amp; Tech Armor
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
                  Mix and match bottle hues, snap on 4mm shockproof silicone boots, choose your CASETiFY-style drop tier and monogram typography.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="hidden md:flex items-center gap-4 text-xs font-medium text-stone-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>EcoShock™ Armor</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-emerald-600" />
                  <span>BPA-Free Silicone</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Quiet Clank Tech</span>
                </div>
              </div>
            </div>

            {/* Configurator Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visualizer Stage */}
              <div className="lg:col-span-6 xl:col-span-7 sticky top-24">
                <BottleVisualizer />
              </div>

              {/* Right Column: Steps & Customizer Controls */}
              <div className="lg:col-span-6 xl:col-span-5">
                <CustomizerSteps />
              </div>
            </div>
          </div>
        )}

        {currentScreen === 'colab-studio' && <CasetifyCoLabView />}
        {currentScreen === 'persona-kits' && <PersonaKitsView />}
        {currentScreen === 'b2b-corporate' && <B2BCorporateView />}
        {currentScreen === 'business-canvas' && <BusinessCanvasView />}
        {currentScreen === 'catalog' && <ProtectorCatalogView />}
        {currentScreen === 'protection-lab' && <ProtectionLabView />}
        {currentScreen === 'palette-lab' && <PaletteLabView />}
        {currentScreen === 'cart' && <CartView />}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-stone-800 animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-10 border-t border-stone-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white text-base font-extrabold tracking-tight">
                <span>MONT<span className="text-emerald-500">i</span>GO</span>
                <span className="text-stone-500 text-xs font-normal">| Shield &amp; Tech Armor Studio</span>
              </div>
              <p className="text-stone-400 text-[11px] max-w-md">
                Inspired by Montigo Ace Bottle Customization and CASETiFY Tech Wardrobe Co-Lab Drops. 30-Day Money Back Guarantee &amp; 1-Year Manufacturing Defect Warranty.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-stone-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Dishwasher Safe Silicone
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero Lead &amp; Non-Toxic
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                DEFENSiFY Anti-Microbial Shield
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <div>
              © 2026 MONTiGO SG &amp; Shield Partners. All Rights Reserved.
            </div>
            <div className="flex gap-4">
              <span className="hover:text-stone-300 cursor-pointer">Silicone Boot Care</span>
              <span className="hover:text-stone-300 cursor-pointer">Compatibility Guide</span>
              <span className="hover:text-stone-300 cursor-pointer">Warranty &amp; Returns</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CustomizerProvider>
      <AppContent />
    </CustomizerProvider>
  );
}
