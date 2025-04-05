import { gql } from '@apollo/client/core';
import { PRODUCT_BASIC_FRAGMENT } from '../fragments/productBasic';
import { PRODUCT_IMAGE_FRAGMENT } from '../fragments/productImage';
import { MAIN_CATEGORY_ID, TAG_IDS, DEFAULT_PAGE_SIZE } from '../config';

export const NEW_PRODUCTS_QUERY = gql`
  query NuevosProductos {
    products(
      where: { tagId: ${TAG_IDS.NEW_PRODUCTS}, categoryId: ${MAIN_CATEGORY_ID} }
      first: ${DEFAULT_PAGE_SIZE.NEW_PRODUCTS}
    ) {
      nodes {
        ... on SimpleProduct {
          ...ProductBasicFields
          ...ProductImageFields
          shortDescription
          productCategories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
  ${PRODUCT_BASIC_FRAGMENT}
  ${PRODUCT_IMAGE_FRAGMENT}
`; 