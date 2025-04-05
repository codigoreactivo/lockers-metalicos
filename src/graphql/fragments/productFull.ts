import { gql } from '@apollo/client/core';
import { PRODUCT_BASIC_FRAGMENT } from './productBasic';
import { PRODUCT_IMAGE_FRAGMENT } from './productImage';

// Fragmento para datos completos de producto
export const PRODUCT_FULL_FRAGMENT = gql`
  fragment ProductFullFields on SimpleProduct {
    ...ProductBasicFields
    ...ProductImageFields
    shortDescription
    productCategories {
      nodes {
        name
        slug
      }
    }
  }
  ${PRODUCT_BASIC_FRAGMENT}
  ${PRODUCT_IMAGE_FRAGMENT}
`; 