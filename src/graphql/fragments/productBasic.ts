import { gql } from '@apollo/client/core';

// Fragmento para datos básicos de producto
export const PRODUCT_BASIC_FRAGMENT = gql`
  fragment ProductBasicFields on SimpleProduct {
    id
    name
    slug
    link
    price(format: RAW)
    regularPrice(format: RAW)
    salePrice(format: RAW)
    onSale
  }
`; 