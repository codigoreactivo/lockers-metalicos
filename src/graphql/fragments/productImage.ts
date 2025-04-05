import { gql } from '@apollo/client/core';
import { IMAGE_FRAGMENT } from './image';

// Fragmento para imagen destacada de un producto
export const PRODUCT_IMAGE_FRAGMENT = gql`
  fragment ProductImageFields on SimpleProduct {
    featuredImage {
      node {
        ...ImageFields
      }
    }
  }
  ${IMAGE_FRAGMENT}
`; 