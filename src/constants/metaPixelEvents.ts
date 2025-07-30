export const META_PIXEL_EVENTS = {
  // Стандартные события
  PAGE_VIEW: "PageView",
  VIEW_CONTENT: "ViewContent",
  ADD_TO_CART: "AddToCart",
  INITIATE_CHECKOUT: "InitiateCheckout",
  PURCHASE: "Purchase",
  SEARCH: "Search",
  VIEW_CATEGORY: "ViewCategory",
  ADD_TO_WISHLIST: "AddToWishlist",
  LEAD: "Lead",
  COMPLETE_REGISTRATION: "CompleteRegistration",

  // Кастомные события
  PRODUCT_VIEW: "ProductView",
  SIZE_SELECTION: "SizeSelection",
  QUANTITY_CHANGE: "QuantityChange",
  CART_OPEN: "CartOpen",
  CART_CLOSE: "CartClose",
  REMOVE_FROM_CART: "RemoveFromCart",
  UPDATE_CART: "UpdateCart",
  EMAIL_SIGNUP: "EmailSignup",
  CONTACT_FORM: "ContactForm",
  SOCIAL_SHARE: "SocialShare",
  VIDEO_PLAY: "VideoPlay",
  GALLERY_VIEW: "GalleryView",
} as const;

export const META_PIXEL_CURRENCIES = {
  AUD: "AUD",
  USD: "USD",
  EUR: "EUR",
} as const;

export const META_PIXEL_CONTENT_TYPES = {
  PRODUCT: "product",
  CATEGORY: "category",
  PAGE: "page",
} as const;
