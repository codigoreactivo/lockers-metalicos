// Re-exportar todos los fragmentos para facilitar su importación

// Imagen básica
export { IMAGE_FRAGMENT } from './image';

// Fragmentos de productos
export { PRODUCT_BASIC_FRAGMENT } from './productBasic';
export { PRODUCT_IMAGE_FRAGMENT } from './productImage';
export { PRODUCT_FULL_FRAGMENT } from './productFull';

// Fragmentos de categorías
export { CATEGORY_BASIC_FRAGMENT } from './categoryBasic';
export { CATEGORY_IMAGE_FRAGMENT } from './categoryImage';
export { CATEGORY_FULL_FRAGMENT } from './categoryFull';

/**
 * Este archivo permite importar fragmentos individuales o todos juntos:
 * 
 * Importación individual (más eficiente):
 * import { PRODUCT_BASIC_FRAGMENT } from '../graphql/fragments/productBasic';
 * 
 * Importación agrupada (más conveniente):
 * import { PRODUCT_BASIC_FRAGMENT, PRODUCT_IMAGE_FRAGMENT } from '../graphql/fragments';
 */ 