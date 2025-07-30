import { createContext } from "react";
import type { ReactNode } from "react";

export interface MetaPixelContextType {
  trackEvent: (eventName: string, parameters?: Record<string, unknown>) => void;
  trackPageView: () => void;
  trackViewContent: (product: {
    id: number;
    name: string;
    category: string;
    price: number;
  }) => void;
  trackAddToCart: (product: {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    size?: string;
  }) => void;
  trackInitiateCheckout: (cart: {
    items: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
  }) => void;
  trackPurchase: (order: {
    id: string;
    items: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
  }) => void;
  trackSearch: (searchTerm: string) => void;
  trackViewCategory: (category: string) => void;
  trackAddToWishlist: (product: {
    id: number;
    name: string;
    category: string;
    price: number;
  }) => void;
  trackLead: () => void;
  trackCompleteRegistration: () => void;
}

export const MetaPixelContext = createContext<MetaPixelContextType | undefined>(
  undefined
);

export interface MetaPixelProviderProps {
  children: ReactNode;
  pixelId: string;
}
