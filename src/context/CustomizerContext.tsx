import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  BOTTLE_CATALOG,
  BOOT_PROTECTORS,
  CAP_PROTECTORS,
  COLOR_PRESETS,
  ACCESSORY_STORE_ITEMS,
  GADGET_PROTECTORS,
  PERSONA_KITS,
  ColorPreset,
  BottleModel,
  ColorVariant,
  BootProtector,
  CapProtector,
  AccessoryItem,
  GadgetProtectorItem,
} from '../data/products';
import { AppScreen, CustomKitConfig, CartItem, CustomerPersona, B2BQuoteRequest } from '../types';
import { playSnapSound, playSiliconeMutedThud } from '../utils/audio';

interface CustomizerContextType {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  kit: CustomKitConfig;
  setKit: React.Dispatch<React.SetStateAction<CustomKitConfig>>;
  activeViewAngle: 'front' | 'boot-focus' | 'cap-focus' | 'rotate';
  setActiveViewAngle: (angle: 'front' | 'boot-focus' | 'cap-focus' | 'rotate') => void;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSound: () => void;

  // Selected entities
  selectedBottle: BottleModel;
  selectedBottleVariant: ColorVariant & { allowEngraving?: boolean };
  selectedBoot: BootProtector | null;
  selectedBootVariant: ColorVariant | null;
  selectedCap: CapProtector | null;
  selectedCapVariant: ColorVariant | null;
  selectedCharm: AccessoryItem | null;
  selectedStrap: AccessoryItem | null;
  selectedEarbudProtector: GadgetProtectorItem | null;
  selectedPhoneProtector: GadgetProtectorItem | null;

  // Selection mutations
  setBottle: (bottleId: string, variantId?: string) => void;
  setBottleVariant: (variantId: string) => void;
  setBoot: (bootId: string | null, variantId?: string | null) => void;
  setBootVariant: (variantId: string) => void;
  setCap: (capId: string | null, variantId?: string | null) => void;
  setCapVariant: (variantId: string) => void;
  setCharm: (charmId: string | null) => void;
  setStrap: (strapId: string | null) => void;
  setEarbudProtector: (id: string | null) => void;
  setPhoneProtector: (id: string | null) => void;
  setEngravingText: (text: string) => void;
  setEngravingFont: (font: string) => void;
  setEngravingIcon: (icon: string) => void;
  setEngravingOrientation: (orientation: 'vertical' | 'horizontal') => void;

  applyPreset: (preset: ColorPreset) => void;
  applyPersonaKit: (personaKey: CustomerPersona) => void;
  randomizeKit: () => void;
  resetToDefault: () => void;

  // Pricing calculations
  pricing: {
    bottlePrice: number;
    bootPrice: number;
    capPrice: number;
    charmPrice: number;
    strapPrice: number;
    earbudsPrice: number;
    phonePrice: number;
    engravingPrice: number;
    rawTotal: number;
    bundleDiscountAmount: number;
    discountPercent: number;
    finalTotal: number;
    hasBundleDiscount: boolean;
  };

  // Cart operations
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  addToCart: (item: CartItem) => void;
  addCurrentKitToCart: () => void;
  addB2BBulkOrderToCart: (req: B2BQuoteRequest, totalCost: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;

  // Feedback toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultKit: CustomKitConfig = {
  bottleId: 'scandi-medium',
  bottleVariantId: 'scandi-sage',
  bootId: 'boot-nonslip',
  bootVariantId: 'boot-pea',
  capId: 'ace-spout-cap',
  capVariantId: 'sp-misty',
  selectedCharmId: null,
  selectedStrapId: null,
  selectedEarbudProtectorId: null,
  selectedPhoneProtectorId: null,
  matchedTechPhone: false,
  matchedTechEarbuds: false,
  engraving: {
    enabled: true,
    text: 'MONTiGO',
    font: 'sans',
    icon: 'star',
    orientation: 'vertical',
    protectionTier: 'ultra-impact',
  },
};

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('customizer');
  const [kit, setKit] = useState<CustomKitConfig>(() => {
    try {
      const saved = localStorage.getItem('montigo_saved_kit');
      return saved ? JSON.parse(saved) : defaultKit;
    } catch {
      return defaultKit;
    }
  });

  const [activeViewAngle, setActiveViewAngle] = useState<'front' | 'boot-focus' | 'cap-focus' | 'rotate'>('front');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('montigo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('montigo_saved_kit', JSON.stringify(kit));
    } catch {
      // ignore
    }
  }, [kit]);

  useEffect(() => {
    try {
      localStorage.setItem('montigo_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playSnapSound();
      return next;
    });
  };

  // Selected entities
  const selectedBottle = useMemo(() => {
    return BOTTLE_CATALOG.find((b) => b.id === kit.bottleId) || BOTTLE_CATALOG[0];
  }, [kit.bottleId]);

  const selectedBottleVariant = useMemo(() => {
    return (
      selectedBottle.variants.find((v) => v.id === kit.bottleVariantId) ||
      selectedBottle.variants[0]
    );
  }, [selectedBottle, kit.bottleVariantId]);

  const selectedBoot = useMemo(() => {
    if (!kit.bootId) return null;
    return BOOT_PROTECTORS.find((b) => b.id === kit.bootId) || null;
  }, [kit.bootId]);

  const selectedBootVariant = useMemo(() => {
    if (!selectedBoot || !kit.bootVariantId) return null;
    return (
      selectedBoot.variants.find((v) => v.id === kit.bootVariantId) ||
      selectedBoot.variants[0]
    );
  }, [selectedBoot, kit.bootVariantId]);

  const selectedCap = useMemo(() => {
    if (!kit.capId) return null;
    return CAP_PROTECTORS.find((c) => c.id === kit.capId) || null;
  }, [kit.capId]);

  const selectedCapVariant = useMemo(() => {
    if (!selectedCap || !kit.capVariantId) return null;
    return (
      selectedCap.variants.find((v) => v.id === kit.capVariantId) ||
      selectedCap.variants[0]
    );
  }, [selectedCap, kit.capVariantId]);

  const selectedCharm = useMemo(() => {
    if (!kit.selectedCharmId) return null;
    return ACCESSORY_STORE_ITEMS.find((a) => a.id === kit.selectedCharmId) || null;
  }, [kit.selectedCharmId]);

  const selectedStrap = useMemo(() => {
    if (!kit.selectedStrapId) return null;
    return ACCESSORY_STORE_ITEMS.find((a) => a.id === kit.selectedStrapId) || null;
  }, [kit.selectedStrapId]);

  const selectedEarbudProtector = useMemo(() => {
    if (!kit.selectedEarbudProtectorId) return null;
    return GADGET_PROTECTORS.find((g) => g.id === kit.selectedEarbudProtectorId) || null;
  }, [kit.selectedEarbudProtectorId]);

  const selectedPhoneProtector = useMemo(() => {
    if (!kit.selectedPhoneProtectorId) return null;
    return GADGET_PROTECTORS.find((g) => g.id === kit.selectedPhoneProtectorId) || null;
  }, [kit.selectedPhoneProtectorId]);

  // Mutations
  const setBottle = (bottleId: string, variantId?: string) => {
    const targetBottle = BOTTLE_CATALOG.find((b) => b.id === bottleId) || BOTTLE_CATALOG[0];
    const targetVariant = variantId || targetBottle.variants[0].id;
    setKit((prev) => ({
      ...prev,
      bottleId,
      bottleVariantId: targetVariant,
    }));
    if (soundEnabled) playSnapSound();
  };

  const setBottleVariant = (variantId: string) => {
    setKit((prev) => ({ ...prev, bottleVariantId: variantId }));
    if (soundEnabled) playSnapSound();
  };

  const setBoot = (bootId: string | null, variantId?: string | null) => {
    if (!bootId) {
      setKit((prev) => ({ ...prev, bootId: null, bootVariantId: null }));
      return;
    }
    const targetBoot = BOOT_PROTECTORS.find((b) => b.id === bootId);
    const targetVariant = variantId || (targetBoot ? targetBoot.variants[0].id : null);
    setKit((prev) => ({
      ...prev,
      bootId,
      bootVariantId: targetVariant,
    }));
    if (soundEnabled) {
      playSiliconeMutedThud();
    }
  };

  const setBootVariant = (variantId: string) => {
    setKit((prev) => ({ ...prev, bootVariantId: variantId }));
    if (soundEnabled) playSiliconeMutedThud();
  };

  const setCap = (capId: string | null, variantId?: string | null) => {
    if (!capId) {
      setKit((prev) => ({ ...prev, capId: null, capVariantId: null }));
      return;
    }
    const targetCap = CAP_PROTECTORS.find((c) => c.id === capId);
    const targetVariant = variantId || (targetCap ? targetCap.variants[0].id : null);
    setKit((prev) => ({
      ...prev,
      capId,
      capVariantId: targetVariant,
    }));
    if (soundEnabled) playSnapSound();
  };

  const setCapVariant = (variantId: string) => {
    setKit((prev) => ({ ...prev, capVariantId: variantId }));
    if (soundEnabled) playSnapSound();
  };

  const setCharm = (charmId: string | null) => {
    setKit((prev) => ({ ...prev, selectedCharmId: charmId }));
    if (soundEnabled) playSnapSound();
  };

  const setStrap = (strapId: string | null) => {
    setKit((prev) => ({ ...prev, selectedStrapId: strapId }));
    if (soundEnabled) playSnapSound();
  };

  const setEarbudProtector = (id: string | null) => {
    setKit((prev) => ({ ...prev, selectedEarbudProtectorId: id }));
    if (soundEnabled) playSnapSound();
  };

  const setPhoneProtector = (id: string | null) => {
    setKit((prev) => ({ ...prev, selectedPhoneProtectorId: id }));
    if (soundEnabled) playSnapSound();
  };

  const setEngravingText = (text: string) => {
    setKit((prev) => ({
      ...prev,
      engraving: {
        ...prev.engraving,
        text,
        enabled: text.trim().length > 0,
      },
    }));
  };

  const setEngravingFont = (font: string) => {
    setKit((prev) => ({
      ...prev,
      engraving: { ...prev.engraving, font },
    }));
  };

  const setEngravingIcon = (icon: string) => {
    setKit((prev) => ({
      ...prev,
      engraving: { ...prev.engraving, icon },
    }));
  };

  const setEngravingOrientation = (orientation: 'vertical' | 'horizontal') => {
    setKit((prev) => ({
      ...prev,
      engraving: { ...prev.engraving, orientation },
    }));
  };

  const applyPreset = (preset: ColorPreset) => {
    let matchedBottle = BOTTLE_CATALOG[0];
    let matchedBottleVar = matchedBottle.variants[0];
    for (const b of BOTTLE_CATALOG) {
      const v = b.variants.find((v) => v.title.toLowerCase().includes(preset.bottleVariantTitle.toLowerCase()));
      if (v) {
        matchedBottle = b;
        matchedBottleVar = v;
        break;
      }
    }

    const matchedBoot = BOOT_PROTECTORS.find((b) => b.slug === preset.bootSlug) || BOOT_PROTECTORS[0];
    const matchedBootVar =
      matchedBoot.variants.find((v) => v.title.toLowerCase().includes(preset.bootVariantTitle.toLowerCase())) ||
      matchedBoot.variants[0];

    const matchedCap = CAP_PROTECTORS.find((c) => c.slug === preset.capSlug) || CAP_PROTECTORS[0];
    const matchedCapVar =
      matchedCap.variants.find((v) => v.title.toLowerCase().includes(preset.capVariantTitle.toLowerCase())) ||
      matchedCap.variants[0];

    setKit((prev) => ({
      ...prev,
      bottleId: matchedBottle.id,
      bottleVariantId: matchedBottleVar.id,
      bootId: matchedBoot.id,
      bootVariantId: matchedBootVar.id,
      capId: matchedCap.id,
      capVariantId: matchedCapVar.id,
    }));

    if (soundEnabled) playSnapSound();
    showToast(`Applied preset: ${preset.name}`);
  };

  const applyPersonaKit = (personaKey: CustomerPersona) => {
    const persona = PERSONA_KITS[personaKey];
    if (!persona) return;

    let matchedBottle = BOTTLE_CATALOG.find((b) => b.id === persona.recommendedKit.bottleId) || BOTTLE_CATALOG[0];
    let matchedBottleVar =
      matchedBottle.variants.find((v) => v.title.toLowerCase().includes(persona.recommendedKit.bottleVariantTitle.toLowerCase())) ||
      matchedBottle.variants[0];

    const matchedBoot = BOOT_PROTECTORS.find((b) => b.slug === persona.recommendedKit.bootSlug) || BOOT_PROTECTORS[0];
    const matchedBootVar =
      matchedBoot.variants.find((v) => v.title.toLowerCase().includes(persona.recommendedKit.bootVariantTitle.toLowerCase())) ||
      matchedBoot.variants[0];

    const matchedCap = CAP_PROTECTORS.find((c) => c.slug === persona.recommendedKit.capSlug) || CAP_PROTECTORS[0];
    const matchedCapVar =
      matchedCap.variants.find((v) => v.title.toLowerCase().includes(persona.recommendedKit.capVariantTitle.toLowerCase())) ||
      matchedCap.variants[0];

    setKit((prev) => ({
      ...prev,
      bottleId: matchedBottle.id,
      bottleVariantId: matchedBottleVar.id,
      bootId: matchedBoot.id,
      bootVariantId: matchedBootVar.id,
      capId: matchedCap.id,
      capVariantId: matchedCapVar.id,
      selectedEarbudProtectorId: personaKey === 'students' || personaKey === 'gym' ? 'gadget-earbuds-silicone' : null,
      selectedPhoneProtectorId: personaKey === 'office' ? 'gadget-phone-armor' : null,
      selectedStrapId: personaKey === 'runners' ? 'store-strap-crossbody' : null,
      selectedCharmId: personaKey === 'children' ? 'store-charm-jelly' : null,
      engraving: {
        ...prev.engraving,
        text: personaKey === 'students' ? 'CAMPUS' : personaKey === 'office' ? 'DESK' : 'ACTIVE',
        enabled: true,
      },
    }));

    if (soundEnabled) playSiliconeMutedThud();
    showToast(`Loaded "${persona.title}" into customiser!`);
    setCurrentScreen('customizer');
  };

  const randomizeKit = () => {
    const randomBottle = BOTTLE_CATALOG[Math.floor(Math.random() * BOTTLE_CATALOG.length)];
    const randomBottleVar = randomBottle.variants[Math.floor(Math.random() * randomBottle.variants.length)];

    const randomBoot = BOOT_PROTECTORS[Math.floor(Math.random() * BOOT_PROTECTORS.length)];
    const randomBootVar = randomBoot.variants[Math.floor(Math.random() * randomBoot.variants.length)];

    const randomCap = CAP_PROTECTORS[Math.floor(Math.random() * CAP_PROTECTORS.length)];
    const randomCapVar = randomCap.variants[Math.floor(Math.random() * randomCap.variants.length)];

    setKit((prev) => ({
      ...prev,
      bottleId: randomBottle.id,
      bottleVariantId: randomBottleVar.id,
      bootId: randomBoot.id,
      bootVariantId: randomBootVar.id,
      capId: randomCap.id,
      capVariantId: randomCapVar.id,
    }));

    if (soundEnabled) playSiliconeMutedThud();
    showToast('Randomized unique protector & bottle styling!');
  };

  const resetToDefault = () => {
    setKit(defaultKit);
    showToast('Reset customizer to default styling');
  };

  // Pricing
  const pricing = useMemo(() => {
    const bottlePrice = selectedBottle.basePrice;
    const bootPrice = selectedBoot ? selectedBoot.price : 0;
    const capPrice = selectedCap ? selectedCap.price : 0;
    const charmPrice = selectedCharm ? selectedCharm.price : 0;
    const strapPrice = selectedStrap ? selectedStrap.price : 0;
    const earbudsPrice = selectedEarbudProtector ? selectedEarbudProtector.price : 0;
    const phonePrice = selectedPhoneProtector ? selectedPhoneProtector.price : 0;
    const engravingPrice = 0; // free on Montigo!

    const rawTotal =
      bottlePrice + bootPrice + capPrice + charmPrice + strapPrice + earbudsPrice + phonePrice + engravingPrice;

    // Bundle discount: 10% off if Bottle + Boot + Cap are all equipped
    const hasBundleDiscount = !!(selectedBoot && selectedCap);
    const discountPercent = hasBundleDiscount ? 10 : 0;
    const bundleDiscountAmount = hasBundleDiscount ? Number(((rawTotal * discountPercent) / 100).toFixed(2)) : 0;
    const finalTotal = Number((rawTotal - bundleDiscountAmount).toFixed(2));

    return {
      bottlePrice,
      bootPrice,
      capPrice,
      charmPrice,
      strapPrice,
      earbudsPrice,
      phonePrice,
      engravingPrice,
      rawTotal,
      bundleDiscountAmount,
      discountPercent,
      finalTotal,
      hasBundleDiscount,
    };
  }, [
    selectedBottle,
    selectedBoot,
    selectedCap,
    selectedCharm,
    selectedStrap,
    selectedEarbudProtector,
    selectedPhoneProtector,
    kit.engraving,
  ]);

  // Cart operations
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return Number(cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0).toFixed(2));
  }, [cart]);

  const freeShippingThreshold = 50.0;
  const freeShippingProgress = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += item.quantity;
        return next;
      }
      return [item, ...prev];
    });
    if (soundEnabled) playSnapSound();
    showToast(`Added "${item.title}" to bag`);
  };

  const addCurrentKitToCart = () => {
    const id = `custom-kit-${Date.now()}`;
    const bootName = selectedBoot && selectedBootVariant ? `${selectedBoot.title} (${selectedBootVariant.title})` : 'None';
    const capName = selectedCap && selectedCapVariant ? `${selectedCap.title} (${selectedCapVariant.title})` : 'Standard Cap';

    const newKitItem: CartItem = {
      id,
      type: 'custom_kit',
      title: `${selectedBottle.title} — Active Shield Kit`,
      subtitle: `${selectedBottleVariant.title} • Boot: ${bootName} • Cap: ${capName}`,
      unitPrice: pricing.finalTotal,
      originalPrice: pricing.rawTotal,
      quantity: 1,
      thumbnail: selectedBootVariant?.image || selectedBottleVariant.image,
      details: {
        bottleTitle: selectedBottle.title,
        bottleColor: selectedBottleVariant.title,
        bottleHex: selectedBottleVariant.hex,
        bootTitle: selectedBoot?.title,
        bootColor: selectedBootVariant?.title,
        bootHex: selectedBootVariant?.hex,
        capTitle: selectedCap?.title,
        capColor: selectedCapVariant?.title,
        capHex: selectedCapVariant?.hex,
        engravingText: kit.engraving.enabled ? kit.engraving.text : undefined,
        engravingIcon: kit.engraving.icon !== 'none' ? kit.engraving.icon : undefined,
        charmTitle: selectedCharm?.title,
        strapTitle: selectedStrap?.title,
        gadgetTitle: selectedEarbudProtector?.title || selectedPhoneProtector?.title,
      },
    };

    addToCart(newKitItem);
  };

  const addB2BBulkOrderToCart = (req: B2BQuoteRequest, totalCost: number) => {
    const id = `b2b-bulk-${Date.now()}`;
    const item: CartItem = {
      id,
      type: 'b2b_bulk_order',
      title: `Bulk Order: ${req.organizationName}`,
      subtitle: `${req.quantity} Custom Shield Bottles with Silicone Boots (${req.type.toUpperCase()})`,
      unitPrice: Number((totalCost / req.quantity).toFixed(2)),
      originalPrice: Number(((totalCost * 1.3) / req.quantity).toFixed(2)),
      quantity: req.quantity,
      thumbnail: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400',
      details: {
        companyOrSchoolName: req.organizationName,
        bulkUnits: req.quantity,
        engravingText: req.customEngravingText || 'Custom Logo Laser Etched',
      },
    };

    addToCart(item);
    showToast(`Bulk inquiry for ${req.quantity} units submitted to bag!`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed item from bag');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Bag cleared');
  };

  return (
    <CustomizerContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        kit,
        setKit,
        activeViewAngle,
        setActiveViewAngle,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
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
        applyPreset,
        applyPersonaKit,
        randomizeKit,
        resetToDefault,
        pricing,
        cart,
        cartCount,
        cartTotal,
        freeShippingThreshold,
        freeShippingProgress,
        addToCart,
        addCurrentKitToCart,
        addB2BBulkOrderToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
