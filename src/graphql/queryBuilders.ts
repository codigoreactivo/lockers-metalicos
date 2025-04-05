import { gql } from '@apollo/client/core';

// Importar fragmentos de productos de forma específica
import { PRODUCT_BASIC_FRAGMENT } from './fragments/productBasic';
import { PRODUCT_IMAGE_FRAGMENT } from './fragments/productImage';
import { PRODUCT_FULL_FRAGMENT } from './fragments/productFull';

// Importar fragmentos de categorías de forma específica
import { CATEGORY_BASIC_FRAGMENT } from './fragments/categoryBasic';
import { CATEGORY_IMAGE_FRAGMENT } from './fragments/categoryImage';
import { CATEGORY_FULL_FRAGMENT } from './fragments/categoryFull';

import { MAIN_CATEGORY_ID, DEFAULT_PAGE_SIZE } from './config';

/**
 * Genera una query para obtener una lista de productos con opciones personalizables
 */
export const buildProductsQuery = ({
  first = DEFAULT_PAGE_SIZE.PRODUCTS,
  categoryId = MAIN_CATEGORY_ID,
  includeIds = [],
  tagId = null,
  featured = null,
  onSale = null,
  queryName = 'GetProducts',
  useFullFragment = false
} = {}) => {
  // Elegir qué fragmentos usar
  const fragmentToUse = useFullFragment ? PRODUCT_FULL_FRAGMENT : `${PRODUCT_BASIC_FRAGMENT}\n${PRODUCT_IMAGE_FRAGMENT}`;
  
  // Construir la consulta de forma segura
  const query = gql`
    query ${queryName} {
      products(
        where: { categoryId: ${categoryId} }
        first: ${first}
      ) {
        nodes {
          ... on SimpleProduct {
            ...${useFullFragment ? 'ProductFullFields' : 'ProductBasicFields\n            ...ProductImageFields'}
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    ${fragmentToUse}
  `;
  
  return query;
};

/**
 * Crea una consulta específica para productos destacados
 */
export const createFeaturedProductsQuery = (ids: number[] | null, limit: number = 8) => {
  // Construir la cláusula where según si se proporcionan IDs o no
  const whereClause = ids && ids.length > 0
    ? `{ categoryId: ${MAIN_CATEGORY_ID}, include: [${ids.join(', ')}] }`
    : `{ categoryId: ${MAIN_CATEGORY_ID} }`;

  return gql`
    query GetFeaturedProducts {
      products(
        where: ${whereClause}
        first: ${limit}
      ) {
        nodes {
          ... on SimpleProduct {
            ...ProductBasicFields
            ...ProductImageFields
          }
        }
      }
    }
    ${PRODUCT_BASIC_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
  `;
};

/**
 * Crea una consulta específica para productos en oferta
 */
export const createSaleProductsQuery = (limit: number = 4) => {
  return gql`
    query GetSaleProducts {
      products(
        where: { categoryId: ${MAIN_CATEGORY_ID}, onSale: true }
        first: ${limit}
      ) {
        nodes {
          ... on SimpleProduct {
            ...ProductBasicFields
            ...ProductImageFields
          }
        }
      }
    }
    ${PRODUCT_BASIC_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
  `;
};

/**
 * Crea una consulta específica para productos nuevos
 */
export const createNewProductsQuery = (tagId: number, limit: number = 8) => {
  return gql`
    query GetNewProducts {
      products(
        where: { categoryId: ${MAIN_CATEGORY_ID}, tagId: ${tagId} }
        first: ${limit}
      ) {
        nodes {
          ... on SimpleProduct {
            ...ProductBasicFields
            ...ProductImageFields
            shortDescription
          }
        }
      }
    }
    ${PRODUCT_BASIC_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
  `;
};

/**
 * Crea una consulta específica para productos más vendidos
 */
export const createBestSellersQuery = (tagId: number, limit: number = 8) => {
  return gql`
    query GetBestSellers {
      products(
        where: { categoryId: ${MAIN_CATEGORY_ID}, tagId: ${tagId} }
        first: ${limit}
      ) {
        nodes {
          ... on SimpleProduct {
            ...ProductBasicFields
            ...ProductImageFields
          }
        }
      }
    }
    ${PRODUCT_BASIC_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
  `;
};

/**
 * Genera una query para obtener una lista de categorías con opciones personalizables
 */
export const buildCategoriesQuery = ({
  first = DEFAULT_PAGE_SIZE.CATEGORIES,
  parentId = MAIN_CATEGORY_ID,
  queryName = 'GetCategories',
  useFullFragment = false
} = {}) => {
  // Elegir qué fragmentos usar
  const fragmentToUse = useFullFragment ? CATEGORY_FULL_FRAGMENT : `${CATEGORY_BASIC_FRAGMENT}\n${CATEGORY_IMAGE_FRAGMENT}`;
  
  // Construir la query completa
  const query = gql`
    query ${queryName} {
      productCategories(
        where: { parent: ${parentId} }
        first: ${first}
      ) {
        nodes {
          ...${useFullFragment ? 'CategoryFullFields' : 'CategoryBasicFields\n          ...CategoryImageFields'}
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    ${fragmentToUse}
  `;
  
  return query;
};

/**
 * Genera una query para obtener un producto individual por slug
 */
export const buildSingleProductQuery = ({
  queryName = 'GetSingleProduct',
  includeRelated = true,
  includeGallery = true,
  includeCategories = true
} = {}) => {
  let productFields = `
    ...ProductFullFields
  `;
  
  // Añadir campos opcionales
  if (includeGallery) {
    productFields += `
    galleryImages {
      nodes {
        altText
        sourceUrl
      }
    }
    `;
  }
  
  if (includeCategories) {
    productFields += `
    productCategories {
      nodes {
        ...CategoryBasicFields
        ...CategoryImageFields
      }
    }
    `;
  }
  
  if (includeRelated) {
    productFields += `
    related {
      nodes {
        ...ProductBasicFields
        ...ProductImageFields
      }
    }
    `;
  }
  
  const query = gql`
    query ${queryName}($id: ID!) {
      product(id: $id, idType: SLUG) {
        ${productFields}
      }
    }
    ${PRODUCT_FULL_FRAGMENT}
    ${PRODUCT_BASIC_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
    ${CATEGORY_BASIC_FRAGMENT}
    ${CATEGORY_IMAGE_FRAGMENT}
  `;
  
  return query;
};

/**
 * Genera una query para obtener una categoría individual por slug
 */
export const buildSingleCategoryQuery = ({
  queryName = 'GetSingleCategory',
  includeProducts = true,
  productsLimit = DEFAULT_PAGE_SIZE.PRODUCTS
} = {}) => {
  let categoryFields = `
    ...CategoryFullFields
  `;
  
  // Añadir productos si se solicitan
  if (includeProducts) {
    categoryFields += `
    products(first: ${productsLimit}) {
      nodes {
        ...ProductBasicFields
        ...ProductImageFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    `;
  }
  
  const query = gql`
    query ${queryName}($id: ID!) {
      productCategory(id: $id, idType: SLUG) {
        ${categoryFields}
      }
    }
    ${CATEGORY_FULL_FRAGMENT}
    ${PRODUCT_BASIC_FRAGMENT}
    ${PRODUCT_IMAGE_FRAGMENT}
  `;
  
  return query;
}; 