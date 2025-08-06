export interface MetaPixelProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity?: number;
  size?: string;
}

export interface MetaPixelCartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface MetaPixelCart {
  items: MetaPixelCartItem[];
  total: number;
}

export interface MetaPixelOrder {
  id: string;
  items: MetaPixelCartItem[];
  total: number;
}

export interface MetaPixelEventParameters {
  content_ids?: number[];
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  contents?: Array<{
    id: number;
    quantity: number;
    item_price: number;
  }>;
  custom_data?: Record<string, unknown>;
  search_string?: string;
  num_items?: number;
}
