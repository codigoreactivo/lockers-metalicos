import { gql } from '@apollo/client/core';
import { MAIN_CATEGORY_ID } from '../config';

export const PRODUCT_CARD_QUERY = gql`
  query ProductCard($first: Int = 10) {
    products(where: { categoryId: ${MAIN_CATEGORY_ID} }, first: $first) {
      nodes {
        ... on SimpleProduct {
          id
          name
          slug
          price (format: RAW)
          regularPrice (format: RAW)
          salePrice (format: RAW)
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          onSale
          shortDescription
        }
      }
    }
  }
`; 