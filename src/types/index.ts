export type AppScreen =
  | 'customizer'
  | 'catalog'
  | 'colab-studio'
  | 'persona-kits'
  | 'b2b-corporate'
  | 'protection-lab'
  | 'palette-lab'
  | 'business-canvas'
  | 'cart';

export type CustomerPersona = 'students' | 'office' | 'gym' | 'runners' | 'children';

export type ProtectionTier = 'impact' | 'ultra-impact' | 'ultra-bounce';

export type TypographyLayout = 'vertical' | 'horizontal' | 'diagonal' | 'stacked-monogram' | 'repeat-pattern';

export interface EngravingConfig {
  enabled: boolean;
  text: string;
  font: string;
  icon: string;
  orientation: TypographyLayout;
  textColor?: string;
  outlineColor?: string;
  protectionTier: ProtectionTier;
}

export interface CustomKitConfig {
  bottleId: string;
  bottleVariantId: string;
  bootId: string | null;
  bootVariantId: string | null;
  capId: string | null;
  capVariantId: string | null;
  selectedCharmId: string | null;
  selectedStrapId: string | null;
  selectedEarbudProtectorId: string | null;
  selectedPhoneProtectorId: string | null;
  matchedTechPhone: boolean;
  matchedTechEarbuds: boolean;
  engraving: EngravingConfig;
}

export interface CartItem {
  id: string;
  type: 'custom_kit' | 'standalone_accessory' | 'gadget_protector' | 'b2b_bulk_order' | 'colab_drop';
  title: string;
  subtitle: string;
  unitPrice: number;
  originalPrice: number;
  quantity: number;
  thumbnail: string;
  protectionTier?: ProtectionTier;
  persona?: CustomerPersona;
  details?: {
    bottleTitle?: string;
    bottleColor?: string;
    bottleHex?: string;
    bootTitle?: string;
    bootColor?: string;
    bootHex?: string;
    capTitle?: string;
    capColor?: string;
    capHex?: string;
    gadgetTitle?: string;
    gadgetColor?: string;
    engravingText?: string;
    engravingIcon?: string;
    charmTitle?: string;
    strapTitle?: string;
    bulkUnits?: number;
    companyOrSchoolName?: string;
    coLabArtist?: string;
  };
}

export interface PersonaKit {
  id: CustomerPersona;
  title: string;
  subtitle: string;
  tagline: string;
  icon: string;
  targetAudience: string;
  painPoints: string[];
  recommendedKit: {
    bottleId: string;
    bottleVariantTitle: string;
    bootVariantTitle: string;
    capVariantTitle: string;
    gadgetBundle: string;
    price: number;
    originalPrice: number;
  };
  features: string[];
  bannerImage: string;
}

export interface B2BQuoteRequest {
  organizationName: string;
  contactName: string;
  email: string;
  type: 'school' | 'corporate' | 'event' | 'sports_club';
  quantity: number;
  selectedBottleStyle: string;
  selectedBootStyle: string;
  logoUploadName?: string;
  customEngravingText?: string;
  pantoneColor?: string;
  notes?: string;
}

export interface CoLabDrop {
  id: string;
  title: string;
  artist: string;
  edition: string;
  badge: string;
  bannerImage: string;
  description: string;
  bottleColor: string;
  bootColor: string;
  capColor: string;
  phoneCaseImage: string;
  earbudsImage: string;
  bottleImage: string;
  priceBundle: number;
  originalBundle: number;
  aestheticTags: string[];
}
