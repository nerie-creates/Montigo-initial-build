import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { B2BQuoteRequest } from '../types';
import {
  Building2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Upload,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Percent,
  FileText,
  Truck,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const B2BCorporateView: React.FC = () => {
  const { addB2BBulkOrderToCart, setCurrentScreen, showToast } = useCustomizer();

  const [formData, setFormData] = useState<B2BQuoteRequest>({
    organizationName: 'National University of Singapore (NUS)',
    contactName: 'Sarah Tan',
    email: 'sarah.tan@nus.edu.sg',
    type: 'school',
    quantity: 100,
    selectedBottleStyle: 'Scandi Ace Bottle Medium (530ml)',
    selectedBootStyle: 'Ace Non-Slip Silicone Boot',
    customEngravingText: 'NUS CLASS OF 2026',
    pantoneColor: 'Navy & Orange Crest',
    notes: 'Gift pack for graduating cohort with silicone protective boots.',
  });

  const [mockupColor, setMockupColor] = useState<'#1F1F1F' | '#006975' | '#96A89B' | '#FFA17A'>('#006975');
  const [mockupBootColor, setMockupBootColor] = useState<'#C4CEC2' | '#D7C4B7' | '#006975' | '#1F1F1F'>('#C4CEC2');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Bulk Tier Pricing Calculation
  const calculatePricing = (qty: number) => {
    let baseUnitPrice = 41.80; // Standard bottle + boot price
    let discountPercent = 15;

    if (qty >= 500) {
      discountPercent = 35;
    } else if (qty >= 250) {
      discountPercent = 28;
    } else if (qty >= 100) {
      discountPercent = 25; // 100 units * $31.35 = ~$2,500 target!
    } else if (qty >= 50) {
      discountPercent = 18;
    }

    const discountedUnit = Number((baseUnitPrice * (1 - discountPercent / 100)).toFixed(2));
    const total = Number((discountedUnit * qty).toFixed(2));
    const regularTotal = Number((baseUnitPrice * qty).toFixed(2));
    const totalSavings = Number((regularTotal - total).toFixed(2));

    return {
      discountPercent,
      discountedUnit,
      total,
      regularTotal,
      totalSavings,
    };
  };

  const currentPricing = calculatePricing(formData.quantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addB2BBulkOrderToCart(formData, currentPricing.total);

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-800 text-xs font-semibold border border-indigo-500/20">
          <Building2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>B2B &amp; School Merchandising Channel • From Business Canvas</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Custom Co-Branded Drinkware &amp; Protectors <br />
          <span className="text-indigo-600">For Universities, Corporates &amp; Teams</span>
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          Targeted B2B bulk orders with precision laser logo etching, custom silicone boot colors, and volume discounts up to 35% off.
        </p>
      </div>

      {/* Tier Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { tier: '50+ Units', discount: '18% OFF', unit: '$34.25', perk: 'Free laser engraving' },
          { tier: '100+ Units', discount: '25% OFF', unit: '$31.35', perk: 'Avg. $2,500 order value (Canvas target)', popular: true },
          { tier: '250+ Units', discount: '28% OFF', unit: '$30.10', perk: 'Free individual gift packaging' },
          { tier: '500+ Units', discount: '35% OFF', unit: '$27.15', perk: 'Custom Pantone matching' },
        ].map((t, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border text-center transition-all ${
              t.popular
                ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600 shadow-xs'
                : 'border-stone-200 bg-white'
            }`}
          >
            {t.popular && (
              <span className="text-[9px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider block mb-1">
                Most Popular Tier
              </span>
            )}
            <div className="text-xs font-bold text-stone-900">{t.tier}</div>
            <div className="text-lg font-extrabold text-indigo-700 mt-0.5">{t.discount}</div>
            <div className="text-[11px] text-stone-500">{t.perk}</div>
          </div>
        ))}
      </div>

      {/* Main Grid: Form & Live Co-Branded Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">
              Bulk Quote &amp; Co-Branded Order Calculator
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Instant pricing breakdown with direct checkout or formal PDF quotation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Organization Type */}
            <div className="space-y-1.5">
              <label className="font-bold text-stone-700 block uppercase tracking-wider text-[11px]">
                Organization Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'school', label: 'School / Univ', icon: <GraduationCap className="w-3.5 h-3.5" /> },
                  { id: 'corporate', label: 'Corporate Office', icon: <Briefcase className="w-3.5 h-3.5" /> },
                  { id: 'event', label: 'Marathon / Event', icon: <Sparkles className="w-3.5 h-3.5" /> },
                  { id: 'sports_club', label: 'Sports Club / Gym', icon: <Award className="w-3.5 h-3.5" /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t.id as B2BQuoteRequest['type'] })}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                      formData.type === t.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Organization Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Organization / School Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Contact Person &amp; Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-2 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">Order Quantity:</span>
                <span className="text-base font-extrabold text-indigo-700 bg-white px-3 py-0.5 rounded-lg border border-indigo-200 shadow-xs">
                  {formData.quantity} Units
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={500}
                step={10}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>20 min</span>
                <span>100 units ($2.5k avg)</span>
                <span>250 units</span>
                <span>500+ units</span>
              </div>
            </div>

            {/* Custom Logo / Engraving Text */}
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 block">
                Custom Laser Engraving Text / Logo Crest
              </label>
              <input
                type="text"
                value={formData.customEngravingText}
                onChange={(e) => setFormData({ ...formData, customEngravingText: e.target.value })}
                placeholder="e.g. NUS CLASS OF 2026, GOOGLE SINGAPORE"
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 uppercase tracking-wider font-semibold focus:ring-1 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            {/* Color Swatch Preferences */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Bottle Powder Finish
                </label>
                <div className="flex gap-2">
                  {[
                    { hex: '#006975', name: 'Teal' },
                    { hex: '#1F1F1F', name: 'Black' },
                    { hex: '#96A89B', name: 'Sage' },
                    { hex: '#FFA17A', name: 'Apricot' },
                  ].map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setMockupColor(c.hex as typeof mockupColor)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        mockupColor === c.hex ? 'border-indigo-600 scale-110 shadow-sm' : 'border-black/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  Silicone Boot Protector
                </label>
                <div className="flex gap-2">
                  {[
                    { hex: '#C4CEC2', name: 'Pea' },
                    { hex: '#D7C4B7', name: 'Caramel' },
                    { hex: '#006975', name: 'Frozen' },
                    { hex: '#1F1F1F', name: 'Black' },
                  ].map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setMockupBootColor(c.hex as typeof mockupBootColor)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        mockupBootColor === c.hex ? 'border-indigo-600 scale-110 shadow-sm' : 'border-black/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-stone-600">Unit Price:</span>
                <div>
                  <span className="font-extrabold text-stone-900 text-sm">
                    ${currentPricing.discountedUnit.toFixed(2)} SGD / unit
                  </span>
                  <span className="text-[10px] text-stone-400 line-through ml-2">
                    $41.80
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-stone-600">Volume Savings:</span>
                <span className="font-bold text-emerald-700">
                  -${currentPricing.totalSavings.toFixed(2)} SGD ({currentPricing.discountPercent}% OFF)
                </span>
              </div>
              <div className="pt-2 border-t border-indigo-200 flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-sm">Total Quote (All-Inclusive):</span>
                <span className="text-xl font-black text-indigo-700">
                  ${currentPricing.total.toFixed(2)} SGD
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Bulk Order to Bag (${currentPricing.total.toFixed(2)})</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Co-Branded Live Mockup (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-stone-100 to-stone-200 rounded-3xl border border-stone-200 p-8 flex flex-col items-center justify-center relative min-h-[460px] shadow-inner">
          <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-white/80 px-2.5 py-1 rounded-full border border-stone-200">
            Co-Branding Live Mockup
          </div>

          {/* Bottle with organization laser engraving */}
          <div className="relative w-48 h-80 flex flex-col items-center justify-end my-6">
            {/* Bottle body */}
            <div
              className="w-32 h-64 rounded-t-2xl rounded-b-lg shadow-2xl flex flex-col items-center justify-between p-3 border border-white/20 relative overflow-hidden transition-colors duration-300"
              style={{ backgroundColor: mockupColor }}
            >
              <div className="w-full h-4 bg-white/20" />

              {/* Laser etched text */}
              <div className="text-center space-y-1 z-10 px-1">
                <div className="text-[10px] font-bold tracking-widest text-white/90 uppercase border-b border-white/40 pb-1">
                  {formData.organizationName}
                </div>
                <div className="text-[9px] font-mono text-white/80 tracking-wider">
                  {formData.customEngravingText || 'CO-BRANDED'}
                </div>
              </div>

              {/* Montigo small hallmark */}
              <div className="text-[8px] font-mono text-white/40 uppercase tracking-widest pb-8">
                MONTiGO CO-LAB
              </div>
            </div>

            {/* Silicone boot protector */}
            <div className="absolute -bottom-1 w-40 h-24 flex items-center justify-center">
              <img
                src="https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400"
                alt="Silicone Boot"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </div>

          <div className="text-center space-y-1">
            <div className="text-xs font-bold text-stone-800">
              {formData.organizationName} Official Edition
            </div>
            <div className="text-[11px] text-stone-500">
              Includes matching silicone base boots + laser etching
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
