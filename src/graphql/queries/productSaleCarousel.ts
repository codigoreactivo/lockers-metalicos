import { gql } from '@apollo/client/core';
import { PRODUCT_BASIC_FRAGMENT } from '../fragments/productBasic';
import { PRODUCT_IMAGE_FRAGMENT } from '../fragments/productImage';
import { MAIN_CATEGORY_ID, SALE_PRODUCT_IDS, DEFAULT_PAGE_SIZE } from '../config';

export const PRODUCT_SALE_CAROUSEL_QUERY = gql`
  query ProductSaleCarousel {
    products(
      where: { categoryId: ${MAIN_CATEGORY_ID}, include: [${SALE_PRODUCT_IDS.join(', ')}] }
      first: ${DEFAULT_PAGE_SIZE.SALE_CAROUSEL}
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