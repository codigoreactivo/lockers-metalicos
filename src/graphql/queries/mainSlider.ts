import { gql } from '@apollo/client/core';
import { PRODUCT_BASIC_FRAGMENT } from '../fragments/productBasic';
import { PRODUCT_IMAGE_FRAGMENT } from '../fragments/productImage';
import { MAIN_CATEGORY_ID, FEATURED_PRODUCT_IDS } from '../config';

export const MAIN_SLIDER_QUERY = gql`
  query MainSlider {
    products(
      first: 8
      where: { categoryId: ${MAIN_CATEGORY_ID}, include: [${FEATURED_PRODUCT_IDS.join(', ')}] }
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