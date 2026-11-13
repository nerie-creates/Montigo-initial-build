import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { playBareMetalClank, playSiliconeMutedThud } from '../utils/audio';
import {
  ShieldCheck,
  ShieldAlert,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
} from 'lucide-react';

export const ProtectionLabView: React.FC = () => {
  const { setCurrentScreen, setBoot, soundEnabled } = useCustomizer();

  // Drop simulation state
  const [dropHeight, setDropHeight] = useState<number>(4); // in feet: 2, 4, 6
  const [testMode, setTestMode] = useState<'with-boot' | 'no-boot'>('with-boot');
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [hasDropped, setHasDropped] = useState<boolean>(false);

  // Tilt test state
  const [tiltAngle, setTiltAngle] = useState<number>(20);

  // Active anatomy hotspot
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const handleRunDrop = () => {
    setIsDropping(true);
    setHasDropped(false);

    setTimeout(() => {
      if (testMode === 'with-boot') {
        if (soundEnabled) playSiliconeMutedThud();
      } else {
        if (soundEnabled) playBareMetalClank();
      }
      setIsDropping(false);
      setHasDropped(true);
    }, 600);
  };

  const anatomyPoints = [
    {
      title: '4mm Shock-Absorbing Core',
      desc: 'High-density elastomeric silicone absorbs 94% of direct kinetic impact energy, stopping base caving and dents.',
      highlight: 'Base',
    },
    {
      title: 'Honeycomb Traction Grid',
      desc: 'Hexagonal suction pattern creates micro-friction on marble, wood, granite, and tile to prevent accidental table knock-overs.',
      highlight: 'Bottom',
    },
    {
      title: 'Precision-Fit Bevel Collar',
      desc: 'Engineered with zero-gap taper so it hugs the bottle curve tightly without collecting water or slipping off.',
      highlight: 'Collar',
    },
    {
      title: 'Acoustic Muffle Chamber',
      desc: 'Eliminates annoying metal-on-glass clank in quiet offices, libraries, lecture halls, and meeting rooms.',
      highlight: 'Acoustic',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-semibold border border-amber-500/20">
          <Activity className="w-3.5 h-3.5 text-amber-600" />
          <span>MONTiGO Protection Science &amp; Drop Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Why Does Your Bottle <br />
          <span className="text-emerald-600">Need a Silicone Protector Boot?</span>
        </h1>
        <p className="text-sm text-stone-500 leading-relaxed">
          Stainless steel bottles are prone to permanent base dents, scratched powder coatings, and loud clattering. See and hear how 4mm silicone changes everything.
        </p>
      </div>

      {/* LAB EXPERIMENT 1: INTERACTIVE DROP TEST SIMULATOR */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Controls */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Experiment 01
              </span>
              <h2 className="text-xl font-bold text-stone-900 mt-1">
                Drop &amp; Impact Resistance Test
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Select drop height, toggle the silicone protector boot, and hit simulate to compare impact forces and acoustic decibels.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-stone-100 rounded-2xl border border-stone-200">
              <button
                onClick={() => {
                  setTestMode('with-boot');
                  setHasDropped(false);
                }}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  testMode === 'with-boot'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>With Silicone Boot</span>
              </button>

              <button
                onClick={() => {
                  setTestMode('no-boot');
                  setHasDropped(false);
                }}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  testMode === 'no-boot'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Without Boot (Bare Steel)</span>
              </button>
            </div>

            {/* Drop Height Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">Drop Height:</span>
                <span className="font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                  {dropHeight} Feet ({dropHeight === 2 ? 'Desk Height' : dropHeight === 4 ? 'Waist Height' : 'Shoulder Height'})
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                step={2}
                value={dropHeight}
                onChange={(e) => {
                  setDropHeight(Number(e.target.value));
                  setHasDropped(false);
                }}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>2 ft (Table)</span>
                <span>4 ft (Pocket/Waist)</span>
                <span>6 ft (Shoulder)</span>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunDrop}
              disabled={isDropping}
              className={`w-full py-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
                testMode === 'with-boot'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-amber-200'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isDropping ? 'Dropping Bottle...' : 'Release Drop Simulation'}</span>
            </button>

            {/* Impact Metric Results */}
            {hasDropped && (
              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 animate-fadeIn ${
                  testMode === 'with-boot'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm">
                  <span className="flex items-center gap-1.5">
                    {testMode === 'with-boot' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                    )}
                    {testMode === 'with-boot' ? 'Passed: Zero Damage' : 'Failed: Damage Incurred'}
                  </span>
                  <span>{testMode === 'with-boot' ? '28 dB (Whisper)' : '88 dB (Loud Clatter)'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200/50 text-[11px]">
                  <div>
                    <span className="text-stone-500 block">Shock Absorption</span>
                    <strong className="text-stone-900 font-bold">
                      {testMode === 'with-boot' ? '94% Absorbed' : '0% (Direct Impact)'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Base Condition</span>
                    <strong className="text-stone-900 font-bold">
                      {testMode === 'with-boot' ? 'Flawless Base' : 'Severe Dent & Scratch'}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Visual Simulation Stage */}
          <div className="w-full lg:w-1/2 h-80 sm:h-96 bg-gradient-to-b from-stone-100 to-stone-200/90 rounded-3xl border border-stone-200 relative flex flex-col items-center justify-end p-6 overflow-hidden shadow-inner">
            {/* Height Ruler Lines */}
            <div className="absolute left-6 top-8 bottom-12 w-px bg-stone-300 flex flex-col justify-between text-[10px] text-stone-400 font-mono">
              <span>6ft</span>
              <span>4ft</span>
              <span>2ft</span>
              <span>Floor</span>
            </div>

            {/* Dropping Bottle Graphic */}
            <div
              className={`relative z-10 transition-all duration-500 ease-in flex flex-col items-center ${
                isDropping
                  ? 'translate-y-48 scale-95'
                  : hasDropped
                  ? 'translate-y-48'
                  : dropHeight === 6
                  ? '-translate-y-24'
                  : dropHeight === 4
                  ? '-translate-y-12'
                  : 'translate-y-0'
              }`}
            >
              {/* Bottle body */}
              <div
                className={`relative w-24 h-48 rounded-t-xl rounded-b-md flex flex-col items-center justify-between border border-stone-400/40 shadow-xl transition-all ${
                  hasDropped && testMode === 'no-boot' ? 'rotate-6' : ''
                }`}
                style={{ backgroundColor: '#96A89B' }}
              >
                <div className="w-full h-4 bg-white/20" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80 py-4 rotate-90">
                  MONTiGO
                </span>

                {/* Bottom Base */}
                {testMode === 'with-boot' ? (
                  /* Silicone Boot Fitted */
                  <div className="absolute -bottom-1 w-28 h-16 flex items-center justify-center">
                    <img
                      src="https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400"
                      alt="Silicone Boot"
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                ) : (
                  /* Bare Metal Base with dent mark after drop */
                  <div className="w-full h-6 bg-stone-400/50 flex items-center justify-center relative">
                    {hasDropped && (
                      <div className="absolute -bottom-1 w-6 h-3 bg-stone-800 rounded-full blur-[1px] animate-ping" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Floor Shock Wave effect */}
            {hasDropped && (
              <div
                className={`absolute bottom-6 w-48 h-6 rounded-full blur-md animate-pulse ${
                  testMode === 'with-boot' ? 'bg-emerald-500/20' : 'bg-rose-500/40 scale-125'
                }`}
              />
            )}

            {/* Hard Floor Surface */}
            <div className="w-full h-8 bg-stone-800 rounded-xl flex items-center justify-center z-20 text-[10px] font-mono text-stone-400 uppercase tracking-widest shadow-md">
              Rigid Granite Surface (Simulated)
            </div>
          </div>
        </div>
      </div>

      {/* LAB EXPERIMENT 2: ANTI-SLIP TABLE TILT TEST */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-10">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Experiment 02
              </span>
              <h2 className="text-xl font-bold text-stone-900 mt-1">
                Grip Traction &amp; Table Tilt Angle
              </h2>
              <p className="text-xs text-stone-500">
                Adjust table tilt slider. Notice how bare steel slides away at 16°, while silicone stays locked up to 40°.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-stone-900">{tiltAngle}°</span>
              <span className="text-xs text-stone-500 block">Current Surface Incline</span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={45}
              value={tiltAngle}
              onChange={(e) => setTiltAngle(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>0° (Flat Desk)</span>
              <span>16° (Bare Steel Slides)</span>
              <span>35° (Car Console / Steep)</span>
              <span>45° (Extreme)</span>
            </div>
          </div>

          {/* Tilt Stage */}
          <div className="relative h-64 bg-stone-100 rounded-3xl border border-stone-200 flex items-center justify-center overflow-hidden p-6">
            {/* Tilting Table Surface */}
            <div
              className="relative w-5/6 h-6 bg-stone-800 rounded-xl shadow-lg transition-transform duration-300 flex items-center justify-around"
              style={{ transform: `rotate(${tiltAngle}deg)` }}
            >
              {/* Bottle 1: Bare Steel (slides down when tilt > 16) */}
              <div
                className={`absolute transition-all duration-500 flex flex-col items-center ${
                  tiltAngle > 16 ? 'right-0 translate-y-12 rotate-45 opacity-60' : 'left-1/4 -top-36'
                }`}
              >
                <div className="w-12 h-36 bg-stone-700 rounded-t-lg rounded-b-xs border border-stone-400 flex flex-col items-center justify-between p-1">
                  <span className="text-[8px] text-white/70 rotate-90 mt-10">Bare Steel</span>
                  <div className="w-full h-3 bg-stone-500" />
                </div>
                {tiltAngle > 16 && (
                  <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold whitespace-nowrap mt-1">
                    Slid off at 16°!
                  </span>
                )}
              </div>

              {/* Bottle 2: With Silicone Boot (sticks up to 40°) */}
              <div
                className={`absolute transition-all duration-300 flex flex-col items-center ${
                  tiltAngle > 40 ? 'right-4 translate-y-8' : 'right-1/4 -top-40'
                }`}
              >
                <div className="relative w-14 h-40 flex flex-col items-center justify-end">
                  {/* Bottle body */}
                  <div className="w-12 h-36 bg-[#96A89B] rounded-t-lg rounded-b-xs flex flex-col items-center justify-between p-1">
                    <span className="text-[8px] text-white/90 rotate-90 mt-8">With Boot</span>
                  </div>
                  {/* Silicone Boot */}
                  <div className="absolute -bottom-1 w-16 h-12 flex items-center justify-center">
                    <img
                      src="https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400"
                      alt="Boot"
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold whitespace-nowrap mt-1">
                  Grip Firm ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANATOMY BREAKDOWN */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800">
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Precision Silicone Engineering
          </span>
          <h2 className="text-2xl font-bold">Anatomy of the MONTiGO Boot</h2>
          <p className="text-xs text-stone-400">
            Click each component to discover how food-grade elastomeric silicone protects your drinkware.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {anatomyPoints.map((point, index) => {
            const isSelected = activeHotspot === index;
            return (
              <div
                key={index}
                onClick={() => setActiveHotspot(index)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500'
                    : 'border-stone-800 bg-stone-800/40 hover:bg-stone-800/80'
                }`}
              >
                <div className="text-xs font-bold text-emerald-400 mb-1">
                  Layer 0{index + 1} • {point.highlight}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{point.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{point.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA to Customizer */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-400">
            Ready to shield your drinkware? Start customising your complete kit now.
          </div>
          <button
            onClick={() => {
              setBoot('boot-nonslip');
              setCurrentScreen('customizer');
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Customise With Boot Protector</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
