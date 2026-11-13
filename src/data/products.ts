export interface ColorVariant {
  id: string;
  title: string;
  hex: string;
  image: string;
  sku?: string;
  price?: number;
}

export interface BottleModel {
  id: string;
  title: string;
  seriesFamily: string;
  size: string;
  volume: string;
  basePrice: number;
  description: string;
  variants: Array<ColorVariant & { allowEngraving?: boolean }>;
}

export interface BootProtector {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  badge?: string;
  features: string[];
  thumbnail: string;
  compatibility: string[];
  variants: ColorVariant[];
}

export interface CapProtector {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  badge?: string;
  features: string[];
  thumbnail: string;
  variants: ColorVariant[];
}

export interface GadgetProtectorItem {
  id: string;
  title: string;
  category: 'earbuds' | 'phone' | 'laptop';
  price: number;
  badge?: string;
  image: string;
  description: string;
  protectionRating: string;
  features: string[];
  variants: ColorVariant[];
}

export interface AccessoryItem {
  id: string;
  title: string;
  category: 'Boot' | 'Cap' | 'Charm' | 'Strap' | 'Bag' | 'Earbuds' | 'Phone' | 'Laptop';
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  description: string;
  compatibility: string;
  colors: { title: string; hex: string; image: string }[];
}

export interface ColorPreset {
  id: string;
  name: string;
  tagline: string;
  bottleVariantTitle: string;
  bootVariantTitle: string;
  capVariantTitle: string;
  capSlug: string;
  bootSlug: string;
  previewColors: [string, string, string];
}

export interface CoLabDropItem {
  id: string;
  title: string;
  artist: string;
  edition: string;
  badge: string;
  description: string;
  bottleVariant: { title: string; hex: string; image: string };
  bootVariant: { title: string; hex: string; image: string };
  capVariant: { title: string; hex: string; image: string };
  phoneCaseImage: string;
  earbudsImage: string;
  bundlePrice: number;
  originalPrice: number;
  tags: string[];
}

export const PROTECTION_TIERS_DATA = [
  {
    id: 'impact',
    title: 'Impact Protection',
    dropRating: '4.9ft (1.5m) Military Grade',
    extraPrice: 0,
    tagline: 'Slim profile with everyday shock absorption',
    badge: 'Standard',
    features: ['Single-layer 3mm silicone', 'Direct anti-dent base', 'Quiet clank acoustic dampening'],
  },
  {
    id: 'ultra-impact',
    title: 'Ultra Impact (Corner Bumpers)',
    dropRating: '9.8ft (3.0m) 4x MIL-STD',
    extraPrice: 4.00,
    tagline: '4 raised air-pocket corner bumpers inspired by CASETiFY',
    badge: 'Most Popular',
    features: [
      'EcoShock™ corner shock dispersers',
      '4mm reinforced perimeter ribbing',
      'DEFENSiFY anti-microbial coating',
      'Raised bezel protects base finish',
    ],
  },
  {
    id: 'ultra-bounce',
    title: 'Ultra Bounce Armor',
    dropRating: '21.3ft (6.5m) 6x MIL-STD',
    extraPrice: 8.00,
    tagline: 'Extreme compression ribs & heavy-duty outdoor drop armor',
    badge: 'Maximum Armor',
    features: [
      'Integrated compression bounce arch',
      '5mm extreme shock absorption',
      'Rugged tactile mountain grip',
      'Engineered for extreme sports & outdoor drops',
    ],
  },
];

export const CASETIFY_COLAB_DROPS: CoLabDropItem[] = [
  {
    id: 'colab-y2k-cyber',
    title: 'Cyber Chrome Y2K Edition',
    artist: 'NEON STUDIO X MONTiGO',
    edition: 'Limited Release • 500 Sets',
    badge: 'Co-Lab Drop',
    description: 'Iridescent holographic reflections, metallic liquid chrome aesthetic, and matching Ultra Bounce bumper gear for phone, earbuds, and bottle.',
    bottleVariant: {
      title: 'Frozen Cyan',
      hex: '#006975',
      image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
    },
    bootVariant: {
      title: 'Cloud Sky Blue',
      hex: '#73CDD5',
      image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_SkyBlue_back.png?v=1783070849&width=400',
    },
    capVariant: {
      title: 'Misty Lilac',
      hex: '#C8CEEA',
      image: 'https://getmontigo.com/cdn/shop/files/SpoutCap_Misty_Lilac.png?v=1728642143&width=400',
    },
    phoneCaseImage: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_Purple.png?v=1783070849&width=400',
    earbudsImage: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400',
    bundlePrice: 68.90,
    originalPrice: 94.70,
    tags: ['Y2K', 'Cyberpunk', 'Holographic', 'Ultra Bounce'],
  },
  {
    id: 'colab-botanical-flora',
    title: 'Botanical Wildflower Studio',
    artist: 'STUDIO FLORA X CASETiFY STYLE',
    edition: 'Artist Capsule',
    badge: 'Trending',
    description: 'Pressed pastel wildflowers embedded inside crystal-clear shockproof cases and soft sage silicone drinkware boots.',
    bottleVariant: {
      title: 'Scandi Sage',
      hex: '#96A89B',
      image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
    },
    bootVariant: {
      title: 'Pea Green',
      hex: '#C4CEC2',
      image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400',
    },
    capVariant: {
      title: 'Matcha Latte',
      hex: '#AEAE92',
      image: 'https://getmontigo.com/cdn/shop/files/Retro_Reel_Ace_Flip_Cap_BAU_-_Matcha_Latte_1.png?v=1781082978&width=400',
    },
    phoneCaseImage: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400',
    earbudsImage: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400',
    bundlePrice: 62.90,
    originalPrice: 88.70,
    tags: ['Botanical', 'Floral', 'Pastel', 'EcoShock'],
  },
  {
    id: 'colab-street-stealth',
    title: 'Monolith Tactical Streetwear',
    artist: 'DEFENSE LAB TOKYO',
    edition: 'Mil-Spec Drop',
    badge: 'Exclusive',
    description: 'Matte midnight black carbon texture with high-contrast safety orange pull tabs and tactical utility rope carabiner.',
    bottleVariant: {
      title: 'Midnight Black',
      hex: '#1F1F1F',
      image: 'https://getmontigo.com/cdn/shop/files/MTAce18ozblack_1.png?v=1791768979&width=600',
    },
    bootVariant: {
      title: 'Midnight Black',
      hex: '#1F1F1F',
      image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Black.png?v=1728640867&width=400',
    },
    capVariant: {
      title: 'Matte Black',
      hex: '#1F1F1F',
      image: 'https://getmontigo.com/cdn/shop/files/AceFlexCap_black_cb27b4dd-7e17-4427-9d7f-13ead8fc2ccd.png?v=1734951819&width=400',
    },
    phoneCaseImage: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Black.png?v=1728640867&width=400',
    earbudsImage: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Black.png?v=1728640867&width=400',
    bundlePrice: 64.90,
    originalPrice: 89.70,
    tags: ['Streetwear', 'Tactical', 'Matte Black', 'Rope Strap'],
  },
];

export const BOTTLE_CATALOG: BottleModel[] = [
  {
    id: 'ace-medium',
    title: 'Ace Bottle Medium',
    seriesFamily: 'Essential BAU',
    size: 'Medium (18oz)',
    volume: '530ml',
    basePrice: 32.90,
    description: 'Double-wall vacuum insulated stainless steel. Keeps drinks cold up to 24 hrs or hot up to 12 hrs.',
    variants: [
      {
        id: 'ace-black',
        title: 'Midnight Black',
        hex: '#1F1F1F',
        image: 'https://getmontigo.com/cdn/shop/files/MTAce18ozblack_1.png?v=1791768979&width=600',
        sku: 'ACE2-BLK-18OZ',
        allowEngraving: true,
      },
      {
        id: 'ace-frozen',
        title: 'Frozen Cyan',
        hex: '#006975',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
        sku: 'ACE2-FRZ-18OZ',
        allowEngraving: true,
      },
      {
        id: 'ace-stone',
        title: 'Stone Grey',
        hex: '#7A8086',
        image: 'https://getmontigo.com/cdn/shop/files/MTAce18ozblack_1.png?v=1791768979&width=600',
        sku: 'ACE2-STN-18OZ',
        allowEngraving: true,
      },
    ],
  },
  {
    id: 'scandi-medium',
    title: 'Scandi Ace Bottle Medium',
    seriesFamily: 'Scandi Minimal',
    size: 'Medium (18oz)',
    volume: '530ml',
    basePrice: 36.90,
    description: 'Nordic-inspired matte ceramic powder coating with earthy natural pastels.',
    variants: [
      {
        id: 'scandi-sage',
        title: 'Scandi Sage',
        hex: '#96A89B',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
        sku: 'SCANDI-SAGE-18',
        allowEngraving: true,
      },
      {
        id: 'scandi-chai',
        title: 'Scandi Chai',
        hex: '#D1B498',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
        sku: 'SCANDI-CHAI-18',
        allowEngraving: true,
      },
      {
        id: 'scandi-cocoa',
        title: 'Scandi Cocoa',
        hex: '#6B4C3E',
        image: 'https://getmontigo.com/cdn/shop/files/MTAce18ozblack_1.png?v=1791768979&width=600',
        sku: 'SCANDI-COCOA-18',
        allowEngraving: true,
      },
      {
        id: 'scandi-blue',
        title: 'Scandi Blue',
        hex: '#6B8799',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
        sku: 'SCANDI-BLUE-18',
        allowEngraving: true,
      },
      {
        id: 'scandi-gooseberry',
        title: 'Scandi Gooseberry',
        hex: '#BCB18B',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
        sku: 'SCANDI-GB-18',
        allowEngraving: true,
      },
    ],
  },
  {
    id: 'cozy-linen-medium',
    title: 'Cozy Linen Ace Bottle',
    seriesFamily: 'Linen Pastel',
    size: 'Medium (18oz)',
    volume: '530ml',
    basePrice: 36.90,
    description: 'Textured matte tactile tactile finish reminiscent of woven linen fiber.',
    variants: [
      {
        id: 'linen-purple',
        title: 'Linen Lilac',
        hex: '#B8AFD1',
        image: 'https://getmontigo.com/cdn/shop/files/CozyLinenBubbleBottleMoveFront-LinenLilac.png',
        sku: 'LINEN-PRP-18',
        allowEngraving: true,
      },
      {
        id: 'linen-pink',
        title: 'Linen Blush',
        hex: '#E4BAC2',
        image: 'https://getmontigo.com/cdn/shop/files/CozyLinenBubbleBottleMoveFront-LinenLilac.png',
        sku: 'LINEN-PNK-18',
        allowEngraving: true,
      },
      {
        id: 'linen-blue',
        title: 'Linen Sky',
        hex: '#A7C4DA',
        image: 'https://getmontigo.com/cdn/shop/files/CozyLinenBubbleBottleMoveFront-LinenLilac.png',
        sku: 'LINEN-BLU-18',
        allowEngraving: true,
      },
      {
        id: 'linen-brown',
        title: 'Linen Latte',
        hex: '#C7B299',
        image: 'https://getmontigo.com/cdn/shop/files/CozyLinenBubbleBottleMoveFront-LinenLilac.png',
        sku: 'LINEN-BRN-18',
        allowEngraving: true,
      },
    ],
  },
  {
    id: 'vibrant-candy-medium',
    title: 'Vibrant Candy Ace Bottle',
    seriesFamily: 'Vibrant Play',
    size: 'Medium (18oz)',
    volume: '530ml',
    basePrice: 38.90,
    description: 'High-contrast energetic hues inspired by retro neon confectionery.',
    variants: [
      {
        id: 'candy-aqua',
        title: 'Aqua Candy',
        hex: '#4ED2C6',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
        sku: 'VIB-AQUA-18',
        allowEngraving: true,
      },
      {
        id: 'candy-apricot',
        title: 'Apricot Candy',
        hex: '#FFA17A',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
        sku: 'VIB-APR-18',
        allowEngraving: true,
      },
      {
        id: 'candy-apple',
        title: 'Apple Candy',
        hex: '#E34A4A',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Medium_250.png',
        sku: 'VIB-APP-18',
        allowEngraving: true,
      },
    ],
  },
];

export const BOOT_PROTECTORS: BootProtector[] = [
  {
    id: 'boot-nonslip',
    slug: 'ace-boot-medium',
    title: 'Ace Non-Slip Silicone Boot',
    tagline: 'Heavy-duty shock absorption & zero-clank quiet landing',
    description: 'Molded from 4mm premium food-grade silicone. Cushions impacts against tile, granite, and asphalt. Prevents base dings, scratches, and noisy clanging.',
    price: 8.90,
    badge: 'Essential',
    features: [
      '4mm reinforced impact base',
      'Anti-slip honeycomb traction bottom',
      'Noise-dampening "quiet clank" tech',
      '100% BPA-free food-grade silicone',
      'Dishwasher safe (top rack)',
    ],
    thumbnail: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_250.png',
    compatibility: ['Ace Medium 530ml', 'Ace Mini 410ml', 'Bubble Bottle 530ml'],
    variants: [
      {
        id: 'boot-pea',
        title: 'Pea Green',
        hex: '#C4CEC2',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400',
        sku: 'SCUSH2-PEA-S',
      },
      {
        id: 'boot-frozen',
        title: 'Frozen Teal',
        hex: '#006975',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Frozen_210x_b7977257-9aee-4ed2-8474-69d204f130ac.webp?v=1784093822&width=400',
        sku: 'SCUSH2-FRZ-S',
      },
      {
        id: 'boot-caramel',
        title: 'Caramel Latte',
        hex: '#D7C4B7',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Caramel.png?v=1728640867&width=400',
        sku: 'SCUSH2-CAR-S',
      },
      {
        id: 'boot-blush',
        title: 'Blush Pink',
        hex: '#F4DDE2',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Blush.png?v=1728640867&width=400',
        sku: 'SCUSH2-BLU-S',
      },
      {
        id: 'boot-grey',
        title: 'Cool Grey',
        hex: '#C7C9C7',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Cool_Grey.png?v=1728640867&width=400',
        sku: 'SCUSH2-GRY-S',
      },
      {
        id: 'boot-black',
        title: 'Midnight Black',
        hex: '#1F1F1F',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Black.png?v=1728640867&width=400',
        sku: 'SCUSH2-BLK-S',
      },
      {
        id: 'boot-cranberry',
        title: 'Cranberry Red',
        hex: '#8A2B3D',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Cranberry.png?v=1728640867&width=400',
        sku: 'SCUSH2-CRN-S',
      },
      {
        id: 'boot-butter',
        title: 'Butter Yellow',
        hex: '#F9E4B7',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Butter.png?v=1728640867&width=400',
        sku: 'SCUSH2-BUT-S',
      },
    ],
  },
  {
    id: 'boot-charm-protector',
    slug: 'boot-charm-mini-medium',
    title: 'Retro Reel Boot Charm Protector',
    tagline: 'Protective bumper with dedicated charm pin dock',
    description: 'Combines rugged base armor with a modular charm slot. Snap on your favorite Montigo silicone pins while keeping your bottle safe from 5-foot drops.',
    price: 10.90,
    badge: 'Popular',
    features: [
      'Built-in secure charm badge loop',
      'Dual-layer corner bumper protection',
      'Textured easy-grip ribs',
      'Matte dirt-repellent silicone finish',
    ],
    thumbnail: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400',
    compatibility: ['Ace Medium 530ml', 'Ace Mini 410ml'],
    variants: [
      {
        id: 'btch-peach',
        title: 'Retro Peach',
        hex: '#F6CDB3',
        image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Peach.png?v=1775448298&width=400',
      },
      {
        id: 'btch-sage',
        title: 'Retro Sage',
        hex: '#DDDFDE',
        image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400',
      },
      {
        id: 'btch-navy',
        title: 'Retro Navy',
        hex: '#6C758B',
        image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Navy.png?v=1775448298&width=400',
      },
      {
        id: 'btch-rose',
        title: 'Retro Rose',
        hex: '#DDB2B6',
        image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Rose.png?v=1775448298&width=400',
      },
      {
        id: 'btch-jade',
        title: 'Retro Jade',
        hex: '#C2CBC2',
        image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Jade.png?v=1775448298&width=400',
      },
      {
        id: 'btch-lemon',
        title: 'Retro Lemon',
        hex: '#F7E3B7',
        image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Lemon.png?v=1775448298&width=400',
      },
    ],
  },
  {
    id: 'cloud-boot-protector',
    slug: 'cloud-boot-charm-mini-medium',
    title: 'Cloud Boot Charm Protector',
    tagline: 'Whimsical scalloped cloud silhouette & impact shield',
    description: 'Sculpted wave-edge cloud base protector. Engineered for shock dispersion with high-density silicone bubbles around the perimeter.',
    price: 10.90,
    badge: 'Trending',
    features: [
      'Sculpted 3D cloud bumper ridge',
      'Extra rebound elastomeric polymer',
      'Self-aligning suction grip',
      'Signature Montigo embossed logo',
    ],
    thumbnail: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_Purple.png?v=1783070849&width=400',
    compatibility: ['Ace Medium 530ml', 'Ace Mini 410ml'],
    variants: [
      {
        id: 'cld-purple',
        title: 'Cloud Purple',
        hex: '#A09BBF',
        image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_Purple.png?v=1783070849&width=400',
      },
      {
        id: 'cld-red',
        title: 'Cloud Cherry Red',
        hex: '#D46C66',
        image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_Red_back.png?v=1783070849&width=400',
      },
      {
        id: 'cld-blue',
        title: 'Cloud Sky Blue',
        hex: '#73CDD5',
        image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_SkyBlue_back.png?v=1783070849&width=400',
      },
    ],
  },
  {
    id: 'jelly-joy-boot',
    slug: 'jelly-joy-boot-medium',
    title: 'Jelly Joy Translucent Boot Protector',
    tagline: 'Candy glow translucent bounce bumper',
    description: 'Semi-translucent shock protector that allows bottle colors to softly diffuse through while offering high-bounce resilience.',
    price: 10.90,
    badge: 'Limited',
    features: [
      'Crystal jelly translucent polymer',
      'High tensile tear-resistant silicone',
      'Raised 6mm rim bumper',
      'Easy slip-on stretch collar',
    ],
    thumbnail: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyPeachMediumBoot.png?v=1791257847',
    compatibility: ['Ace Medium 530ml', 'Ace Mini 410ml'],
    variants: [
      {
        id: 'jelly-peach',
        title: 'Jelly Peach',
        hex: '#FFB088',
        image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyPeachMediumBoot.png?v=1791257847',
      },
      {
        id: 'jelly-rose',
        title: 'Jelly Rose',
        hex: '#F7A8B8',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Blush.png?v=1728640867&width=400',
      },
      {
        id: 'jelly-mint',
        title: 'Jelly Mint',
        hex: '#A8E6CF',
        image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400',
      },
    ],
  },
];

export const CAP_PROTECTORS: CapProtector[] = [
  {
    id: 'ace-spout-cap',
    slug: 'ace-spout-cap',
    title: 'Ace Spout Cap with Grip Ring',
    tagline: 'Fast flow spout with shockproof silicone rim',
    description: 'Ergonomic chug spout with leakproof silicone seal gasket, hinged dust cover, and built-in finger carry ring.',
    price: 8.90,
    badge: 'Most Popular',
    features: [
      'Silicone sealed mouthpiece',
      'Hinged stay-open flip cover',
      'Comfort wide-loop handle',
      '100% leak-proof guaranteed',
    ],
    thumbnail: 'https://getmontigo.com/cdn/shop/files/Ace_Spout_Cap_yellow.png?v=1740647741&width=400',
    variants: [
      {
        id: 'sp-misty',
        title: 'Misty Lilac',
        hex: '#C8CEEA',
        image: 'https://getmontigo.com/cdn/shop/files/SpoutCap_Misty_Lilac.png?v=1728642143&width=400',
      },
      {
        id: 'sp-blue',
        title: 'Cornflower Blue',
        hex: '#89ABE3',
        image: 'https://getmontigo.com/cdn/shop/files/SpoutCap_Cornflower_Blue.png?v=1728642143&width=400',
      },
      {
        id: 'sp-blush',
        title: 'Blush Pink',
        hex: '#F4DDE2',
        image: 'https://getmontigo.com/cdn/shop/files/SpoutCap_Blush.png?v=1728642143&width=400',
      },
      {
        id: 'sp-grey',
        title: 'Cool Grey',
        hex: '#C7C9C7',
        image: 'https://getmontigo.com/cdn/shop/files/SpoutCap_Cool_Grey.png?v=1728642143&width=400',
      },
      {
        id: 'sp-frozen',
        title: 'Frozen Teal',
        hex: '#006975',
        image: 'https://getmontigo.com/cdn/shop/files/AceSpoutCap_Frozen.png?v=1728642144&width=400',
      },
      {
        id: 'sp-yellow',
        title: 'Lemon Pop',
        hex: '#F8DE93',
        image: 'https://getmontigo.com/cdn/shop/files/Ace_Spout_Cap_yellow.png?v=1740647741&width=400',
      },
    ],
  },
  {
    id: 'ace-flex-cap',
    slug: 'ace-flex-cap',
    title: 'Ace Flex Cap with Soft Strap',
    tagline: 'Insulated cap with 180° pivoting silicone strap',
    description: 'Minimalist insulated lid with flexible soft-touch silicone handle that bends flush against bags or hooks onto carabiners.',
    price: 8.90,
    badge: 'Lightweight',
    features: [
      '180° rotating silicone flex handle',
      'Vacuum-insulated thermal plug',
      'Ultra-compact low profile',
      'Tactile knurled twist grip',
    ],
    thumbnail: 'https://getmontigo.com/cdn/shop/files/Ace_Flex_Cap_cap_type.png?v=1784093791&width=400',
    variants: [
      {
        id: 'fl-black',
        title: 'Matte Black',
        hex: '#1F1F1F',
        image: 'https://getmontigo.com/cdn/shop/files/AceFlexCap_black_cb27b4dd-7e17-4427-9d7f-13ead8fc2ccd.png?v=1734951819&width=400',
      },
      {
        id: 'fl-grey',
        title: 'Warm Grey',
        hex: '#BFB8AF',
        image: 'https://getmontigo.com/cdn/shop/files/AceFlexCap_Grey_2e3dc341-f59b-4c2d-bab0-1db5a65bfe4d.png?v=1734952045&width=400',
      },
      {
        id: 'fl-coolgrey',
        title: 'Cool Grey',
        hex: '#C7C9C7',
        image: 'https://getmontigo.com/cdn/shop/files/AceFlexCap_Cool_Grey_f570622e-8636-4ee2-8d11-284b33da6750.png?v=1734952045&width=400',
      },
      {
        id: 'fl-blush',
        title: 'Blush Pink',
        hex: '#F4DDE2',
        image: 'https://getmontigo.com/cdn/shop/files/AceFlexCap_blush_af14b7bf-1531-4e42-8209-7042ba99b6b1.png?v=1734951819&width=400',
      },
      {
        id: 'fl-lemon',
        title: 'Lemon Sorbet',
        hex: '#F8DE93',
        image: 'https://getmontigo.com/cdn/shop/files/AceFlexCap_lemon.png?v=1734951819&width=400',
      },
    ],
  },
  {
    id: 'ace-flip-cap',
    slug: 'ace-flip-cap',
    title: 'Ace Flip Cap with Guard Straw',
    tagline: 'Spring-action button with covered hygienic straw',
    description: 'One-touch push button opens a protective cap cover, deploying an ultra-soft silicone drinking straw that stays completely sheltered from exterior grime.',
    price: 10.90,
    badge: 'Gym & Commute',
    features: [
      'Spring-loaded quick click lid',
      'Food-grade soft silicone straw tip',
      'Safety lock latch prevents spills in bag',
      'Protects straw from airborne germs',
    ],
    thumbnail: 'https://getmontigo.com/cdn/shop/files/Ace_Flip_Cap_cap_type.png?v=1784093792&width=400',
    variants: [
      {
        id: 'fp-matcha',
        title: 'Matcha Latte',
        hex: '#AEAE92',
        image: 'https://getmontigo.com/cdn/shop/files/Retro_Reel_Ace_Flip_Cap_BAU_-_Matcha_Latte_1.png?v=1781082978&width=400',
      },
      {
        id: 'fp-icy',
        title: 'Icy Blue',
        hex: '#C3E3E7',
        image: 'https://getmontigo.com/cdn/shop/files/Retro_Reel_Ace_Flip_Cap_BAU_-_Icy_Blue_1.png?v=1781082977&width=400',
      },
      {
        id: 'fp-lightpink',
        title: 'Light Pink',
        hex: '#F9B5C4',
        image: 'https://getmontigo.com/cdn/shop/files/RetroReelAceFlipCapBAU-LightPink.png?v=1775448304&width=400',
      },
      {
        id: 'fp-lavender',
        title: 'Lavender Mist',
        hex: '#D6BFDD',
        image: 'https://getmontigo.com/cdn/shop/files/Retro_Reel_Ace_Flip_Cap_BAU_-_Lavender_1.png?v=1781082978&width=400',
      },
      {
        id: 'fp-caramel',
        title: 'Caramel Latte',
        hex: '#D7C4B7',
        image: 'https://getmontigo.com/cdn/shop/files/Retro_Reel_Ace_Flip_Cap_BAU_-_Caramel_Latte_1.png?v=1781082978&width=400',
      },
    ],
  },
  {
    id: 'ace-sip-cap',
    slug: 'ace-sip-cap',
    title: 'Ace Sip Cap with Soft Mouthpiece',
    tagline: 'Dual sip or chug mode with silicone bumper rim',
    description: 'Innovative dual-port drink lid with integrated silicone lip comfort cushion and sturdy reinforced carry loop.',
    price: 10.90,
    badge: 'Dual Flow',
    features: [
      'Dual flow: Sip or gulp opening',
      'Comfort-fit silicone mouthpiece',
      'Drop-shielded rim construction',
      'Aero-vent for smooth glug-free drinking',
    ],
    thumbnail: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyAcesipcapblue_0731b261-97e9-4185-8959-73023c8f5885.png?v=1785229868&width=400',
    variants: [
      {
        id: 'sip-rose',
        title: 'Jelly Rose',
        hex: '#F7C9D5',
        image: 'https://getmontigo.com/cdn/shop/files/MTJellyJoyAceSipCapJellyRose.png?v=1791257792&width=400',
      },
      {
        id: 'sip-mint',
        title: 'Jelly Mint',
        hex: '#D3DDAF',
        image: 'https://getmontigo.com/cdn/shop/files/MTJellyJoyAceSipCapJellyMint.png?v=1791257792&width=400',
      },
      {
        id: 'sip-blue',
        title: 'Vibrant Pink Blue',
        hex: '#73CDD5',
        image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyAcesipcapblue.png?v=1783070846&width=400',
      },
      {
        id: 'sip-purple',
        title: 'Vibrant Purple',
        hex: '#A09BBF',
        image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyAcesipcappurple.png?v=1783070846&width=400',
      },
    ],
  },
];

export const GADGET_PROTECTORS: GadgetProtectorItem[] = [
  {
    id: 'gadget-earbuds-silicone',
    title: 'Shield Earbuds Silicone Protector Case',
    category: 'earbuds',
    price: 14.90,
    badge: 'Color-Matched',
    image: 'https://getmontigo.com/cdn/shop/files/MTJellyJoyPeachMediumBoot.png?v=1791257847',
    description: 'Impact-absorbing silicone sleeve for wireless earbuds with matte anti-lint coating, shock corner dampers, and an anodized aluminum carabiner.',
    protectionRating: 'Drop-Tested 6ft (MIL-STD-810G)',
    features: [
      'Precision hinge cutout & wireless charging compatible',
      'Matte soft-touch silicone prevents dust clinging',
      'Anodized aluminum alloy carabiner clip',
      'Colors matched exactly to Montigo bottle boots',
    ],
    variants: [
      { id: 'eb-pea', title: 'Pea Green', hex: '#C4CEC2', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400' },
      { id: 'eb-frozen', title: 'Frozen Teal', hex: '#006975', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Frozen_210x_b7977257-9aee-4ed2-8474-69d204f130ac.webp?v=1784093822&width=400' },
      { id: 'eb-black', title: 'Midnight Black', hex: '#1F1F1F', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Black.png?v=1728640867&width=400' },
      { id: 'eb-caramel', title: 'Caramel Latte', hex: '#D7C4B7', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Caramel.png?v=1728640867&width=400' },
      { id: 'eb-blush', title: 'Blush Pink', hex: '#F4DDE2', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Blush.png?v=1728640867&width=400' },
    ],
  },
  {
    id: 'gadget-phone-armor',
    title: 'Active Grip Silicone Phone Bumper Case',
    category: 'phone',
    price: 24.90,
    badge: 'MagSafe Ready',
    image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400',
    description: 'Triple-layer phone armor featuring liquid silicone outer shell, polycarbonate core, and microfiber lining. Air-cushioned corners absorb harsh drops.',
    protectionRating: '10ft Drop Certified',
    features: [
      'Raised 2mm bezel protects screen and camera lenses',
      'Honeycomb interior shock dispersion',
      'Non-slip tactile perimeter texture',
      'Seamless aesthetic alignment with your bottle boot',
    ],
    variants: [
      { id: 'ph-sage', title: 'Retro Sage', hex: '#DDDFDE', image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400' },
      { id: 'ph-peach', title: 'Retro Peach', hex: '#F6CDB3', image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Peach.png?v=1775448298&width=400' },
      { id: 'ph-navy', title: 'Retro Navy', hex: '#6C758B', image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Navy.png?v=1775448298&width=400' },
      { id: 'ph-black', title: 'Midnight Black', hex: '#1F1F1F', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Black.png?v=1728640867&width=400' },
    ],
  },
  {
    id: 'gadget-laptop-armor',
    title: 'Quilted Shockproof Laptop Sleeve & Corner Guards',
    category: 'laptop',
    price: 38.90,
    badge: '13-16" Fit',
    image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/menu_bottleBag.png',
    description: 'Water-resistant padded ripstop laptop sleeve reinforced with 3D molded silicone corner shock bumpers to prevent cracked screens and dented edges.',
    protectionRating: 'Full 360° Perimeter Guard',
    features: [
      'Silicone bumper reinforced corners',
      'Soft plush faux-fur interior lining',
      'Dual external zipper compartments for charger & cable',
      'Integrated strap loop for bottle carrier attachment',
    ],
    variants: [
      { id: 'lp-cream', title: 'Cream Quilted', hex: '#EAE6DF', image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/menu_bottleBag.png' },
      { id: 'lp-charcoal', title: 'Charcoal Grey', hex: '#3A3D40', image: 'https://getmontigo.com/cdn/shop/files/MTAce18ozblack_1.png?v=1791768979&width=600' },
    ],
  },
];

export const ACCESSORY_STORE_ITEMS: AccessoryItem[] = [
  {
    id: 'store-casetify-utility-strap',
    title: 'CASETiFY-Style Utility Crossbody Rope Strap',
    category: 'Strap',
    price: 18.90,
    rating: 5.0,
    reviewsCount: 310,
    badge: 'Trending Iconic',
    image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/Retro_Reel_Bottle_Strap_BAU_-_Matcha_Latte_1.png?v=1781082980',
    description: 'Heavy-duty 8mm climbing rope lanyard with dual anodized matte alloy carabiners and dual-attachment silicone loop anchor.',
    compatibility: 'Fits all bottles, phone cases & bags',
    colors: [
      { title: 'Neon Orange & Black Rope', hex: '#FF5A00', image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/Retro_Reel_Bottle_Strap_BAU_-_Matcha_Latte_1.png?v=1781082980' },
      { title: 'Matcha Earth Rope', hex: '#AEAE92', image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/Retro_Reel_Bottle_Strap_BAU_-_Matcha_Latte_1.png?v=1781082980' },
      { title: 'Cyber Silver Rope', hex: '#CCCCCC', image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/Retro_Reel_Bottle_Strap_BAU_-_Matcha_Latte_1.png?v=1781082980' },
    ],
  },
  {
    id: 'store-beaded-wristlet',
    title: 'Y2K Beaded Charm Wristlet Strap',
    category: 'Charm',
    price: 14.90,
    rating: 4.9,
    reviewsCount: 224,
    badge: 'Popular',
    image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyJellyJoyCharmJellySET.png?v=1791257845',
    description: 'Chic beaded wrist strap with smiley, heart, pearl, and metallic beads that loops into bottle handles or phone case corners.',
    compatibility: 'Universal fit for bottles & phone cases',
    colors: [
      { title: 'Pastel Rainbow Beads', hex: '#F9B5C4', image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyJellyJoyCharmJellySET.png?v=1791257845' },
    ],
  },
  {
    id: 'store-boot-nonslip',
    title: 'Ace Non-Slip Silicone Boot Medium',
    category: 'Boot',
    price: 8.90,
    rating: 4.9,
    reviewsCount: 384,
    badge: 'Best Seller',
    image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400',
    description: 'Thickened 4mm food-grade silicone boot designed to fit all Ace 18oz / 530ml bottles. Dampens landing sound and protects from high drops.',
    compatibility: 'Ace Medium (18oz) / Ace Mini (14oz)',
    colors: [
      { title: 'Pea Green', hex: '#C4CEC2', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400' },
      { title: 'Frozen Teal', hex: '#006975', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Frozen_210x_b7977257-9aee-4ed2-8474-69d204f130ac.webp?v=1784093822&width=400' },
      { title: 'Caramel Latte', hex: '#D7C4B7', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Caramel.png?v=1728640867&width=400' },
      { title: 'Midnight Black', hex: '#1F1F1F', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Black.png?v=1728640867&width=400' },
    ],
  },
  {
    id: 'store-boot-charm',
    title: 'Retro Reel Silicone Boot with Charm Slot',
    category: 'Boot',
    price: 10.90,
    rating: 4.8,
    reviewsCount: 192,
    badge: 'Trending',
    image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400',
    description: 'Enhanced bumper boot featuring a dedicated docking slot for Montigo charm pins, plus dual-rib corner shock buffers.',
    compatibility: 'Ace Medium (18oz) / Ace Mini (14oz)',
    colors: [
      { title: 'Retro Sage', hex: '#DDDFDE', image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400' },
      { title: 'Retro Peach', hex: '#F6CDB3', image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Peach.png?v=1775448298&width=400' },
      { title: 'Retro Navy', hex: '#6C758B', image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Navy.png?v=1775448298&width=400' },
    ],
  },
  {
    id: 'store-cloud-boot',
    title: 'Cloud Wave Bumper Boot Protector',
    category: 'Boot',
    price: 10.90,
    rating: 5.0,
    reviewsCount: 88,
    badge: 'New',
    image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_Purple.png?v=1783070849&width=400',
    description: 'Sculpted cloud perimeter absorbs direct edge shocks while adding a soft, stylish aesthetic to your bottle base.',
    compatibility: 'Ace Medium (18oz)',
    colors: [
      { title: 'Cloud Purple', hex: '#A09BBF', image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_Purple.png?v=1783070849&width=400' },
      { title: 'Cloud Red', hex: '#D46C66', image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_Red_back.png?v=1783070849&width=400' },
      { title: 'Cloud Blue', hex: '#73CDD5', image: 'https://getmontigo.com/cdn/shop/files/MTVibrantCandyCloudCharmBootMedium_SkyBlue_back.png?v=1783070849&width=400' },
    ],
  },
  {
    id: 'store-gadget-earbuds',
    title: 'AirPods & Earbuds Shockproof Silicone Case',
    category: 'Earbuds',
    price: 14.90,
    rating: 4.9,
    reviewsCount: 178,
    badge: 'Gadget Shield',
    image: 'https://getmontigo.com/cdn/shop/files/MTJellyJoyPeachMediumBoot.png?v=1791257847',
    description: 'Military-grade shock protection case with carabiner clip. Matches your Montigo bottle boot colors.',
    compatibility: 'AirPods Pro 1/2, AirPods 3/4, Galaxy Buds',
    colors: [
      { title: 'Pea Green', hex: '#C4CEC2', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Pea.png?v=1728640867&width=400' },
      { title: 'Frozen Teal', hex: '#006975', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Frozen_210x_b7977257-9aee-4ed2-8474-69d204f130ac.webp?v=1784093822&width=400' },
      { title: 'Midnight Black', hex: '#1F1F1F', image: 'https://getmontigo.com/cdn/shop/files/Boot_Medium_Black.png?v=1728640867&width=400' },
    ],
  },
  {
    id: 'store-gadget-phone',
    title: 'Active Grip Phone Bumper Armor',
    category: 'Phone',
    price: 24.90,
    rating: 4.8,
    reviewsCount: 112,
    badge: 'Full Armor',
    image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400',
    description: 'Triple-layer shock absorption phone case with raised camera shield and tactile silicone grip side rails.',
    compatibility: 'iPhone 15/16 Pro, Samsung S24/S25 Ultra',
    colors: [
      { title: 'Retro Sage', hex: '#DDDFDE', image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Sage.png?v=1775448298&width=400' },
      { title: 'Retro Peach', hex: '#F6CDB3', image: 'https://getmontigo.com/cdn/shop/files/RetroReelMediumBootCharm-Peach.png?v=1775448298&width=400' },
    ],
  },
  {
    id: 'store-charm-jelly',
    title: 'Jelly Joy 4-Piece Silicone Charm Set',
    category: 'Charm',
    price: 12.90,
    rating: 4.9,
    reviewsCount: 145,
    badge: 'Limited',
    image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyJellyJoyCharmJellySET.png?v=1791257845',
    description: 'Water-resistant, color-locking silicone charms that plug into Boot Charms, Flex Cap handles, and strap loops.',
    compatibility: 'Fits all Montigo Boot Charms & Flex Cap loops',
    colors: [
      { title: 'Candy Mix', hex: '#FFB088', image: 'https://cdn.shopify.com/s/files/1/0568/5483/9459/files/MTJellyJoyJellyJoyCharmJellySET.png?v=1791257845' },
    ],
  },
];

export const PERSONA_KITS: Record<string, {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  icon: string;
  targetAudience: string;
  painPoints: string[];
  recommendedKit: {
    bottleId: string;
    bottleTitle: string;
    bottleVariantTitle: string;
    bootVariantTitle: string;
    capVariantTitle: string;
    bootSlug: string;
    capSlug: string;
    gadgetBundle: string;
    price: number;
    originalPrice: number;
  };
  features: string[];
}> = {
  students: {
    id: 'students',
    title: 'Campus Active Kit',
    subtitle: 'For Students & University Commuters',
    tagline: 'Lightweight, backpack-drop proof & custom initial laser engraving',
    icon: 'GraduationCap',
    targetAudience: 'High school and university students carrying heavy laptops, notes, and drinkware across campus.',
    painPoints: [
      'Bottles denting when thrown into backpacks with laptops',
      'Loud clatter during quiet lectures and study halls',
      'Accidental mix-ups in lecture theatres',
    ],
    recommendedKit: {
      bottleId: 'vibrant-candy-medium',
      bottleTitle: 'Vibrant Candy Ace Bottle',
      bottleVariantTitle: 'Aqua Candy',
      bootVariantTitle: 'Cloud Sky Blue',
      capVariantTitle: 'Vibrant Pink Blue',
      bootSlug: 'cloud-boot-charm-mini-medium',
      capSlug: 'ace-sip-cap',
      gadgetBundle: 'Includes Earbud Silicone Protector & Free Student Engraving',
      price: 49.90,
      originalPrice: 62.70,
    },
    features: [
      'Free student name/student ID laser etching',
      'Dual sip/chug cap for fast lecture breaks',
      'Cloud bumper rim prevents backpack denting',
      '15% Student discount verified via university email',
    ],
  },
  office: {
    id: 'office',
    title: 'Executive Quiet-Desk Kit',
    subtitle: 'For Office Workers & Corporate Professionals',
    tagline: 'Acoustic noise dampening: Zero loud desk clanks in boardroom meetings',
    icon: 'Briefcase',
    targetAudience: 'Desk professionals, corporate executives, and remote workers who prioritize clean minimalism and acoustic courtesy.',
    painPoints: [
      'Loud metallic ringing when putting water bottle down on conference tables',
      'Scratched meeting room glass and wooden desks',
      'Cluttered workstation aesthetic',
    ],
    recommendedKit: {
      bottleId: 'scandi-medium',
      bottleTitle: 'Scandi Ace Bottle Medium',
      bottleVariantTitle: 'Scandi Sage',
      bootVariantTitle: 'Pea Green',
      capVariantTitle: 'Warm Grey',
      bootSlug: 'ace-boot-medium',
      capSlug: 'ace-flex-cap',
      gadgetBundle: 'Includes Matching Phone Armor Case & Quiet-Clank Base',
      price: 54.90,
      originalPrice: 70.70,
    },
    features: [
      '28 dB whisper-quiet acoustic base landing',
      'Understated Nordic ceramic matte powder finish',
      'Compact flex handle fits inside briefcases',
      'Corporate bulk custom engraving available',
    ],
  },
  gym: {
    id: 'gym',
    title: 'Gym & Cross-Training Armor',
    subtitle: 'For Gym Members, Crossfitters & Athletes',
    tagline: 'Sweat-resistant honeycomb grip & heavy dumbbell drop absorption',
    icon: 'Dumbbell',
    targetAudience: 'Fitness enthusiasts and weightlifters who need tough, sanitizable hydration gear that survives accidental gym floor drops.',
    painPoints: [
      'Bottles knocked over by weights or kicking on gym floor',
      'Slippery sweat-covered hands causing drops',
      'Slow water flow during intense HIIT intervals',
    ],
    recommendedKit: {
      bottleId: 'ace-medium',
      bottleTitle: 'Ace Bottle Medium',
      bottleVariantTitle: 'Midnight Black',
      bootVariantTitle: 'Midnight Black',
      capVariantTitle: 'Lemon Pop',
      bootSlug: 'ace-boot-medium',
      capSlug: 'ace-spout-cap',
      gadgetBundle: 'Includes Earbud Armor Case with Carabiner for Gym Locker',
      price: 46.90,
      originalPrice: 59.70,
    },
    features: [
      'High-flow wide chug spout for quick hydration',
      'Heavy-duty 4mm silicone base absorbs 6ft impacts',
      'Sweat-repellent tactile hex friction traction',
      '100% Dishwasher-safe sanitization',
    ],
  },
  runners: {
    id: 'runners',
    title: 'Trail & Marathon Runner Kit',
    subtitle: 'For Runners, Hikers & Outdoor Athletes',
    tagline: 'Hands-free ergonomic crossbody sling with high-visibility colorway',
    icon: 'Footprints',
    targetAudience: 'Joggers, 10K/marathon runners, and trail hikers wanting bounce-free, hands-free hydration on the move.',
    painPoints: [
      'Carrying heavy bottles in hands causes arm fatigue',
      'Dropping bottles on rough gravel trails causes severe dents',
      'Lack of visibility during early morning or sunset runs',
    ],
    recommendedKit: {
      bottleId: 'vibrant-candy-medium',
      bottleTitle: 'Vibrant Candy Ace Bottle',
      bottleVariantTitle: 'Apricot Candy',
      bootVariantTitle: 'Cloud Cherry Red',
      capVariantTitle: 'Misty Lilac',
      bootSlug: 'cloud-boot-charm-mini-medium',
      capSlug: 'ace-spout-cap',
      gadgetBundle: 'Includes Crossbody Strap with Anti-Slip Collar & Phone Lanyard',
      price: 52.90,
      originalPrice: 66.70,
    },
    features: [
      'Hands-free crossbody strap with silicone security collar',
      'High-visibility energetic candy contrast for dusk running',
      'Fast-cap twist spout operable with one hand',
      'Drop protection against concrete pavements and gravel',
    ],
  },
  children: {
    id: 'children',
    title: 'Junior Cloud Guard Kit',
    subtitle: 'For Kids & School Children',
    tagline: '100% Non-toxic BPA-free food-grade silicone with playful cloud bumpers',
    icon: 'Baby',
    targetAudience: 'Parents wanting durable, hygienic, shatterproof hydration that kids love carrying to school and playgrounds.',
    painPoints: [
      'Frequent drops on school playground asphalt',
      'Lid straws getting dirty or contaminated',
      'Toxic plastic concerns or lead leaching',
    ],
    recommendedKit: {
      bottleId: 'cozy-linen-medium',
      bottleTitle: 'Cozy Linen Ace Bottle',
      bottleVariantTitle: 'Linen Lilac',
      bootVariantTitle: 'Cloud Sky Blue',
      capVariantTitle: 'Light Pink',
      bootSlug: 'cloud-boot-charm-mini-medium',
      capSlug: 'ace-flip-cap',
      gadgetBundle: 'Includes 4-Piece Fun Silicone Charm Set & Covered Straw Lid',
      price: 49.90,
      originalPrice: 65.70,
    },
    features: [
      'Spring-loaded flip lid shelters straw from germs & dirt',
      'Certified 100% food-grade BPA-free non-toxic silicone',
      'Playful snap-in charms keep kids excited about drinking water',
      'Deep cloud bumper prevents denting on school concrete',
    ],
  },
};

export const BUSINESS_MODEL_CANVAS_DATA = {
  title: 'Accessories Protectors Business Model Canvas',
  sourceImage: '/public/assets/aistudio/Business_Model_Canvas_b264cd14.png',
  blocks: {
    keyPartners: {
      title: 'Key Partners',
      subtitle: 'What are your key partners to get competitive advantage?',
      items: [
        'Bottle manufacturer (precision double-wall insulated steel)',
        'Protection case manufacturer (food-grade silicone & shock TPU)',
        'Designer (artist collections & seasonal palettes)',
        'KOL / Influencer (active lifestyle co-branding & creator drops)',
        'Celebrity (high-impact lifestyle ambassadorship)',
        'Logistics partner (express 2-3 day dispatch & regional fulfillment)',
      ],
    },
    keyActivities: {
      title: 'Key Activities',
      subtitle: 'What are the key steps to move ahead to your customers?',
      items: [
        'Conduct continuous market research',
        'Update interactive product catalogue',
        'Streamline global & regional logistics',
        'List & audit suppliers for key materials (BPA-free silicone, 304/316 steel)',
        'Execute targeted digital marketing campaigns',
        'Product research, development, and industrial design',
        'Maintain strict product quality control & drop-testing standards',
      ],
    },
    keyResources: {
      title: 'Key Resources',
      subtitle: 'What resources do you need to make your idea work?',
      items: [
        'Latest trend intelligence in the market for collaboration purposes',
        'Data analytics and business intelligence tracking customizer choices',
        'HR: skilled industrial designers, engineers, and support employees',
        'Online channels: interactive web customizer, social media accounts',
      ],
    },
    valuePropositions: {
      title: 'Key Value Propositions',
      subtitle: 'How will you make your customers’ life happier?',
      items: [
        'Customizable protectors for accessories & drinkware',
        'Uniquely designed by you (real-time 3D customizer & laser engraving)',
        'Protects gadgets and bottles for active lifestyle (gym, commute, run)',
        'Option to choose our curated designer series',
        'Wholistic protection in style for phones, earbuds, laptops, and bottles',
        '30-day money back guarantee',
        '1-year manufacturing defect warranty',
      ],
    },
    customerRelationships: {
      title: 'Customer Relationships',
      subtitle: 'How often will you interact with your customers?',
      items: [
        'Daily social media engagement & community styling showcases',
        'Weekly / monthly newsletter on latest products, drops, or promotions',
        'Direct corporate branding outreach for co-branded employee gifts',
        'Direct outreach to Schools and Universities for campus merchandise',
      ],
    },
    channels: {
      title: 'Channels',
      subtitle: 'How are you going to reach your customers?',
      items: [
        'Online channels: web interactive configurator, social ads, email marketing',
        'Offline events: experiential pop-up stores & tactile drop-test booths',
        'Collab drops with partner brands and creator capsules',
        'Corporate events & university campus pop-ups',
      ],
    },
    customerSegments: {
      title: 'Customer Segments',
      subtitle: 'Who are your customers? Target audience:',
      items: [
        'Students (campus carry, backpack drop protection, fun charms, budget-friendly)',
        'Office Workers (quiet clank acoustic dampening, conference room elegance)',
        'Gym members (high grip, sweat-resistant, drop shock absorption)',
        'Runners (crossbody hands-free sling, lightweight, high-visibility)',
        'Children (shatterproof cloud bumpers, non-toxic BPA-free, germ-free straw cap)',
      ],
    },
    costStructure: {
      title: 'Cost Structure',
      subtitle: 'How much are you planning to spend for a 6-month period?',
      amount: '$30,000 for 6 months',
      items: [
        'Supplier deposit & tooling molds: $12,000',
        'R&D and prototype 3D drop-testing: $6,000',
        'Marketing, influencer seeding & digital ads: $7,000',
        'Logistics, packaging & warehouse operations: $5,000',
      ],
    },
    revenueStreams: {
      title: 'Revenue Streams',
      subtitle: 'How much are you planning to earn in a certain period?',
      items: [
        'B2C Online (6 months): $24,000 (800 orders @ avg. $30/order)',
        'B2B / School (6 months): $10,000 (4 corporate/school bulk orders @ avg. $2,500/order)',
        'Target Total 6-Month Revenue: $34,000 (Profitable over $30k cost base)',
      ],
    },
  },
};

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'preset-matcha',
    name: 'Matcha Latte Tranquility',
    tagline: 'Earthy tea tones with calming botanicals',
    bottleVariantTitle: 'Scandi Sage',
    bootVariantTitle: 'Pea Green',
    capVariantTitle: 'Matcha Latte',
    bootSlug: 'ace-boot-medium',
    capSlug: 'ace-flip-cap',
    previewColors: ['#96A89B', '#C4CEC2', '#AEAE92'],
  },
  {
    id: 'preset-sunset',
    name: 'Peach Sorbet Glow',
    tagline: 'Warm golden hour peach and buttercream',
    bottleVariantTitle: 'Apricot Candy',
    bootVariantTitle: 'Butter Yellow',
    capVariantTitle: 'Lemon Pop',
    bootSlug: 'ace-boot-medium',
    capSlug: 'ace-spout-cap',
    previewColors: ['#FFA17A', '#F9E4B7', '#F8DE93'],
  },
  {
    id: 'preset-stealth',
    name: 'Midnight Monolith',
    tagline: 'Matte black armor for sleek understated styling',
    bottleVariantTitle: 'Midnight Black',
    bootVariantTitle: 'Midnight Black',
    capVariantTitle: 'Matte Black',
    bootSlug: 'ace-boot-medium',
    capSlug: 'ace-flex-cap',
    previewColors: ['#1F1F1F', '#1F1F1F', '#1F1F1F'],
  },
  {
    id: 'preset-cloud-lilac',
    name: 'Dreamy Cyber Cloud',
    tagline: 'Pastel lilac with celestial sky blue cloud rim',
    bottleVariantTitle: 'Linen Lilac',
    bootVariantTitle: 'Cloud Sky Blue',
    capVariantTitle: 'Misty Lilac',
    bootSlug: 'cloud-boot-charm-mini-medium',
    capSlug: 'ace-spout-cap',
    previewColors: ['#B8AFD1', '#73CDD5', '#C8CEEA'],
  },
  {
    id: 'preset-nordic-chai',
    name: 'Nordic Chai & Latte',
    tagline: 'Warm toasted neutrals with caramel cushioning',
    bottleVariantTitle: 'Scandi Chai',
    bootVariantTitle: 'Caramel Latte',
    capVariantTitle: 'Caramel Latte',
    bootSlug: 'ace-boot-medium',
    capSlug: 'ace-flip-cap',
    previewColors: ['#D1B498', '#D7C4B7', '#D7C4B7'],
  },
  {
    id: 'preset-frosted-ocean',
    name: 'Glacier Ocean Teal',
    tagline: 'Deep oceanic teal paired with icy crystal accents',
    bottleVariantTitle: 'Frozen Cyan',
    bootVariantTitle: 'Frozen Teal',
    capVariantTitle: 'Cornflower Blue',
    bootSlug: 'ace-boot-medium',
    capSlug: 'ace-spout-cap',
    previewColors: ['#006975', '#006975', '#89ABE3'],
  },
];

export const ENGRAVING_FONTS = [
  { id: 'sans', name: 'Clean Modern', css: 'font-sans font-semibold tracking-wider' },
  { id: 'serif', name: 'Editorial Serif', css: 'font-serif italic tracking-wide' },
  { id: 'mono', name: 'Technical Mono', css: 'font-mono uppercase tracking-widest' },
  { id: 'casetify-bold', name: 'CASETiFY Bold Block', css: 'font-extrabold tracking-tight uppercase' },
  { id: 'playful', name: 'Soft Rounded', css: 'font-sans font-bold tracking-tight' },
];

export const ENGRAVING_ICONS = [
  { id: 'none', label: 'None', symbol: '' },
  { id: 'heart', label: 'Heart', symbol: '♥' },
  { id: 'star', label: 'Star', symbol: '✦' },
  { id: 'sparkle', label: 'Sparkle', symbol: '✨' },
  { id: 'sun', label: 'Sun', symbol: '☼' },
  { id: 'leaf', label: 'Leaf', symbol: '☘' },
  { id: 'wave', label: 'Wave', symbol: '≈' },
  { id: 'coffee', label: 'Coffee', symbol: '☕' },
];
