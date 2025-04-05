import { gql } from '@apollo/client/core';

// Fragmento para categorías básicas
export const CATEGORY_BASIC_FRAGMENT = gql`
  fragment CategoryBasicFields on ProductCategory {
    id
    name
    slug
    count
    link
  }
`; 