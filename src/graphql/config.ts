// Configuración central para queries GraphQL

// ID de la categoría principal de productos
export const MAIN_CATEGORY_ID = 81;

// IDs de productos destacados para slider principal
export const MAIN_SLIDER_PRODUCT_IDS = [4573, 4593, 4611, 4623, 4648, 4651, 4718, 4602];
// Alias más claro para el HeroSlider
export const FEATURED_PRODUCT_IDS = MAIN_SLIDER_PRODUCT_IDS;

// IDs específicos para los productos del tooltip
export const TOOLTIP_PRODUCT_PER_PAGE = 3;
export const TOOLTIP_CATEGORY_ID = 81;

// IDs de productos en oferta
export const SALE_PRODUCT_IDS = [4611, 4597, 4575, 4643];

// IDs de productos best sellers
export const BEST_SELLER_PRODUCT_IDS = [2675, 2688, 2666, 2670, 4115, 2676, 4518];

// IDs de productos nuevos
export const NEW_PRODUCT_IDS = [4704, 4715, 2692, 4518];

// IDs de productos en oferta (ofertas.astro)
export const SALE_PRODUCT_IDS_OFERTAS = [4611, 4597, 4575, 4643];

// Valores predeterminados para paginación
export const DEFAULT_PAGE_SIZE = {
  PRODUCTS: 12,
  CATEGORIES: 30,
  SLIDERS: 8,
  SALE_CAROUSEL: 4,
  BEST_SELLERS: 8,
  NEW_PRODUCTS: 8,
  RELATED_PRODUCTS: 4,
  SALE_PRODUCTS_PAGE: 4
};

// Tag IDs
export const TAG_IDS = {
  NEW_PRODUCTS: 110,
  FEATURED: 113,
};

// Booleanos
export const BOOLEAN_VALUES = {
  IS_BEST_SELLER: true,
};

// Categorías destacadas
export const FEATURED_CATEGORY_IDS = [75, 76, 77, 78, 79]; 