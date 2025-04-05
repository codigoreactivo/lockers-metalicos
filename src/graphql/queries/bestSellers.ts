import { gql } from '@apollo/client/core';
import { PRODUCT_BASIC_FRAGMENT } from '../fragments/productBasic';
import { PRODUCT_IMAGE_FRAGMENT } from '../fragments/productImage';
import { MAIN_CATEGORY_ID, DEFAULT_PAGE_SIZE, BOOLEAN_VALUES } from '../config';

export const BEST_SELLERS_QUERY = gql`
  query BestSellers {
    products(
      where: { 
        featured: ${BOOLEAN_VALUES.IS_BEST_SELLER}, 
        categoryId: ${MAIN_CATEGORY_ID} 
      }
      first: ${DEFAULT_PAGE_SIZE.BEST_SELLERS}
    ) {
      nodes {
        ... on SimpleProduct {
          ...ProductBasicFields
          ...ProductImageFields
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