import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { PERSONA_KITS, GADGET_PROTECTORS } from '../data/products';
import { CustomerPersona } from '../types';
import {
  GraduationCap,
  Briefcase,
  Dumbbell,
  Footprints,
  Baby,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Award,
  Smartphone,
  Headphones,
  Laptop,
} from 'lucide-react';

export const PersonaKitsView: React.FC = () => {
  const { applyPersonaKit, setCurrentScreen } = useCustomizer();
  const [activePersona, setActivePersona] = useState<CustomerPersona>('students');

  const personaIcons: Record<string, React.ReactNode> = {
    students: <GraduationCap className="w-5 h-5 text-indigo-500" />,
    office: <Briefcase className="w-5 h-5 text-slate-600" />,
    gym: <Dumbbell className="w-5 h-5 text-rose-500" />,
    runners: <Footprints className="w-5 h-5 text-amber-500" />,
    children: <Baby className="w-5 h-5 text-sky-500" />,
  };

  const selectedKit = PERSONA_KITS[activePersona];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-semibold border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Curated for Active Lifestyles • From Our Business Model</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Protectors Built For How You Move <br />
          <span className="text-emerald-600">Students, Office, Gym, Runners &amp; Kids</span>
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          Everyone uses drinkware and gear differently. Explore our purpose-built protection bundles designed around your daily routine with holistic drop resistance.
        </p>
      </div>

      {/* Persona Tab Switcher */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center overflow-x-auto p-1.5 bg-stone-100 rounded-2xl border border-stone-200 gap-1.5 max-w-full scrollbar-none">
          {(Object.keys(PERSONA_KITS) as CustomerPersona[]).map((key) => {
            const persona = PERSONA_KITS[key];
            const isActive = activePersona === key;
            return (
              <button
                key={key}
                onClick={() => setActivePersona(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {personaIcons[key]}
                <span>{persona.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Persona Featured Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Details & Solution */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-stone-100">{personaIcons[activePersona]}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {selectedKit.subtitle}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                {selectedKit.title}
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed font-medium">
                {selectedKit.tagline}
              </p>
            </div>

            {/* Daily Pain Points Addressed */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Daily Friction Points Solved:
              </span>
              <div className="space-y-1.5 text-xs text-stone-700">
                {selectedKit.painPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Engineered Protection Features:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-800">
                {selectedKit.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-stone-400 block uppercase font-bold">
                  Curated Active Bundle Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-stone-900">
                    ${selectedKit.recommendedKit.price.toFixed(2)} SGD
                  </span>
                  <span className="text-xs line-through text-stone-400">
                    ${selectedKit.recommendedKit.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Save ${(selectedKit.recommendedKit.originalPrice - selectedKit.recommendedKit.price).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => applyPersonaKit(activePersona)}
                className="px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Load &amp; Customise This Kit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Mockup Bundle */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200/80 rounded-3xl border border-stone-200 p-8 flex flex-col items-center justify-center relative min-h-[380px] shadow-inner overflow-hidden">
            <div className="relative w-48 h-72 flex flex-col items-center justify-end">
              {/* Bottle body representation */}
              <div className="w-32 h-56 rounded-t-2xl rounded-b-lg bg-[#96A89B] shadow-2xl flex flex-col items-center justify-between p-2 border border-white/20">
                <span className="text-[9px] font-mono uppercase text-white/80 py-2 rotate-90">
                  MONTiGO
                </span>
                <span className="text-[10px] font-bold text-white bg-black/20 px-2 py-0.5 rounded-md mb-8">
                  {selectedKit.recommendedKit.bottleVariantTitle}
                </span>
              </div>

              {/* Boot protector */}
              <div className="absolute -bottom-1 w-40 h-24 flex items-center justify-center">
                <img
                  src="https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400"
                  alt="Boot"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* Cap */}
              <div className="absolute -top-4 w-24 h-20 flex items-center justify-center">
                <img
                  src="https://getmontigo.com/cdn/shop/files/SpoutCap_Misty_Lilac.png?v=1728642143&width=400"
                  alt="Cap"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
            </div>

            {/* Bundle callout badge */}
            <div className="mt-4 px-3 py-1.5 rounded-full bg-white/90 text-stone-800 text-xs font-semibold border border-stone-200 shadow-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{selectedKit.recommendedKit.gadgetBundle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* WHOLISTIC PROTECTION GADGET ECOSYSTEM (From Business Model Canvas: "Wholistic protection in style for phones, earbuds, laptops, bottles") */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 space-y-6 border border-stone-800">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Complete Active Ecosystem</span>
          </div>
          <h3 className="text-2xl font-bold">Wholistic Protection in Style</h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            Synchronize protection across your daily everyday carry. Match your Montigo bottle boot with companion shockproof armor for wireless earbuds, phones, and laptops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GADGET_PROTECTORS.map((gadget) => (
            <div
              key={gadget.id}
              className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700/80 flex flex-col justify-between space-y-4 hover:border-emerald-500 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-700 text-stone-300 px-2 py-0.5 rounded-md">
                    {gadget.category.toUpperCase()} ARMOR
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {gadget.protectionRating}
                  </span>
                </div>

                <div className="h-32 bg-stone-900/60 rounded-xl p-3 flex items-center justify-center">
                  <img
                    src={gadget.image}
                    alt={gadget.title}
                    className="h-full object-contain filter drop-shadow-md"
                  />
                </div>

                <h4 className="text-sm font-bold text-white">{gadget.title}</h4>
                <p className="text-xs text-stone-400 line-clamp-2">{gadget.description}</p>
              </div>

              <div className="pt-3 border-t border-stone-700 flex items-center justify-between">
                <span className="text-base font-extrabold text-white">
                  ${gadget.price.toFixed(2)} SGD
                </span>
                <button
                  onClick={() => setCurrentScreen('catalog')}
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>View in Store</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
