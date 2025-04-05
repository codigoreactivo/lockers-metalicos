import { gql } from '@apollo/client/core';
import { CATEGORY_BASIC_FRAGMENT } from './categoryBasic';
import { CATEGORY_IMAGE_FRAGMENT } from './categoryImage';

// Fragmento para categoría completa
export const CATEGORY_FULL_FRAGMENT = gql`
  fragment CategoryFullFields on ProductCategory {
    ...CategoryBasicFields
    ...CategoryImageFields
    description
  }
  ${CATEGORY_BASIC_FRAGMENT}
  ${CATEGORY_IMAGE_FRAGMENT}
`; 