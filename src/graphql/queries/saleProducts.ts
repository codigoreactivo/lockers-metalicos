import { gql } from '@apollo/client/core';
import { MAIN_CATEGORY_ID, DEFAULT_PAGE_SIZE } from '../config';

export const SALE_PRODUCTS_QUERY = gql`
  query SaleProducts($include: [Int], $categoryId: Int = ${MAIN_CATEGORY_ID}, $first: Int = ${DEFAULT_PAGE_SIZE.SALE_PRODUCTS_PAGE}) {
    products(
      where: { categoryId: $categoryId, include: $include }
      first: $first
    ) {
      nodes {
        ... on SimpleProduct {
          id
          name
          price (format: RAW)
          regularPrice (format: RAW)
          salePrice (format: RAW)
          onSale
          slug
          featuredImage {
            node {
              altText
              sourceUrl
              mediaItemUrl
            }
          }
          shortDescription
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`; 