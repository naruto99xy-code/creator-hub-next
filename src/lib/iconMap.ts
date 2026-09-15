import {
  Bot, Sparkles, Heart, Code, Brain, MessageCircleHeart, Zap, Package,
  Star, Shield, Rocket, Cpu, Smartphone, Globe, Crown, Music, Camera,
  Gamepad2, Wand2, LucideIcon,
} from 'lucide-react';

/** String keys stored in ai_products.icon_name -> the actual Lucide component. Keep in sync with the <select> options in AdminAIProductForm. */
export const ICON_MAP: Record<string, LucideIcon> = {
  Bot, Sparkles, Heart, Code, Brain, MessageCircleHeart, Zap, Package,
  Star, Shield, Rocket, Cpu, Smartphone, Globe, Crown, Music, Camera,
  Gamepad2, Wand2,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}
