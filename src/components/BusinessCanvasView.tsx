import React, { useState } from 'react';
import { BUSINESS_MODEL_CANVAS_DATA } from '../data/products';
import { useCustomizer } from '../context/CustomizerContext';
import {
  FileText,
  Users,
  Target,
  Sparkles,
  Layers,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Check,
  ArrowRight,
  ExternalLink,
  ZoomIn,
} from 'lucide-react';

export const BusinessCanvasView: React.FC = () => {
  const { setCurrentScreen } = useCustomizer();
  const [selectedBlock, setSelectedBlock] = useState<string>('valuePropositions');
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);

  const { blocks, sourceImage } = BUSINESS_MODEL_CANVAS_DATA;

  const blockNavigation = [
    { id: 'valuePropositions', label: 'Value Propositions', icon: '✨', count: 7, color: 'text-amber-600 bg-amber-50' },
    { id: 'customerSegments', label: 'Customer Segments', icon: '🎯', count: 5, color: 'text-rose-600 bg-rose-50' },
    { id: 'revenueStreams', label: 'Revenue Streams', icon: '💰', count: 2, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'costStructure', label: 'Cost Structure', icon: '📉', count: 4, color: 'text-slate-600 bg-slate-50' },
    { id: 'channels', label: 'Channels', icon: '📢', count: 4, color: 'text-orange-600 bg-orange-50' },
    { id: 'customerRelationships', label: 'Relationships', icon: '🤝', count: 4, color: 'text-blue-600 bg-blue-50' },
    { id: 'keyPartners', label: 'Key Partners', icon: '🤝', count: 6, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'keyActivities', label: 'Key Activities', icon: '⚡', count: 7, color: 'text-cyan-600 bg-cyan-50' },
    { id: 'keyResources', label: 'Key Resources', icon: '🧠', count: 4, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-stone-200 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strategic Foundation • Strategyzer Business Model Canvas</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Business Model Canvas Architecture <br />
          <span className="text-emerald-600">Drinkware &amp; Gadget Accessories Protectors</span>
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          Integrated with the Montigo Ace Bottle customizer concept, this view shows the full business framework, financial projections ($34k revenue vs $30k cost), and strategic implementation.
        </p>
      </div>

      {/* Embedded Original Canvas Visual Asset */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Original Strategyzer Canvas
            </span>
            <h2 className="text-lg font-bold text-stone-900">
              Uploaded Business Model Canvas Asset
            </h2>
          </div>
          <button
            onClick={() => setIsImageZoomed(!isImageZoomed)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 self-start sm:self-auto"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{isImageZoomed ? 'Collapse Image' : 'Zoom Image'}</span>
          </button>
        </div>

        <div
          className={`relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 flex items-center justify-center transition-all ${
            isImageZoomed ? 'max-h-[850px]' : 'max-h-[380px]'
          }`}
        >
          <img
            src={sourceImage}
            alt="Business Model Canvas"
            className="w-full h-auto object-contain cursor-pointer hover:opacity-95"
            onClick={() => setIsImageZoomed(!isImageZoomed)}
          />
        </div>
        <p className="text-[11px] text-stone-400 text-center">
          Tap image to expand full view of all 9 sticky-note pillars.
        </p>
      </div>

      {/* Financial Feasibility Summary (Cost Structure vs Revenue Streams) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost Structure Box */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" /> Cost Structure
            </span>
            <span className="text-xs font-bold bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
              6-Month Budget
            </span>
          </div>

          <div className="text-2xl font-black text-stone-900">$30,000 SGD</div>
          <p className="text-xs text-stone-500">
            Initial capital allocation for supplier tooling deposits, R&amp;D drop testing, marketing campaigns, and warehouse operations.
          </p>

          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-700">
            {blocks.costStructure.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Streams Box */}
        <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-xs space-y-4 bg-emerald-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Revenue Streams
            </span>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
              6-Month Target
            </span>
          </div>

          <div className="text-2xl font-black text-emerald-800">$34,000 SGD Projected</div>
          <p className="text-xs text-stone-600">
            Dual channel revenue model combining high-velocity B2C customizer sales with high-margin B2B school/corporate bulk orders.
          </p>

          <div className="space-y-2.5 pt-2 border-t border-emerald-100 text-xs">
            <div className="p-3 bg-white rounded-xl border border-emerald-200/80 flex items-center justify-between">
              <div>
                <strong className="text-stone-900 block">B2C Online Customizer: $24,000</strong>
                <span className="text-stone-500 text-[11px]">800 orders @ avg. $30.00 / order</span>
              </div>
              <span className="text-xs font-bold text-emerald-700">70.5% of rev</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-emerald-200/80 flex items-center justify-between">
              <div>
                <strong className="text-stone-900 block">B2B &amp; School Merchandising: $10,000</strong>
                <span className="text-stone-500 text-[11px]">4 bulk orders @ avg. $2,500.00 / order</span>
              </div>
              <span className="text-xs font-bold text-emerald-700">29.5% of rev</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 9-Building-Block Explorer */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Deep Dive
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            Explore Canvas Pillars &amp; How This App Realizes Them
          </h2>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center overflow-x-auto gap-2 pb-2 scrollbar-none">
          {blockNavigation.map((block) => {
            const isSelected = selectedBlock === block.id;
            return (
              <button
                key={block.id}
                onClick={() => setSelectedBlock(block.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>{block.icon}</span>
                <span>{block.label}</span>
                <span className="text-[10px] opacity-70">({block.count})</span>
              </button>
            );
          })}
        </div>

        {/* Block Content Display */}
        <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-stone-900">
              {blocks[selectedBlock as keyof typeof blocks]?.title}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {blocks[selectedBlock as keyof typeof blocks]?.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {blocks[selectedBlock as keyof typeof blocks]?.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white rounded-xl border border-stone-200/80 text-xs text-stone-800 flex items-start gap-2.5 shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                  ✓
                </div>
                <span className="leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Quick link button to corresponding app screen */}
          <div className="pt-3 border-t border-stone-200 flex justify-end">
            {selectedBlock === 'valuePropositions' && (
              <button
                onClick={() => setCurrentScreen('customizer')}
                className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800"
              >
                <span>Try Live Customiser</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {selectedBlock === 'customerSegments' && (
              <button
                onClick={() => setCurrentScreen('persona-kits')}
                className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800"
              >
                <span>View Lifestyle Personas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {selectedBlock === 'revenueStreams' && (
              <button
                onClick={() => setCurrentScreen('b2b-corporate')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
              >
                <span>Open B2B &amp; School Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
