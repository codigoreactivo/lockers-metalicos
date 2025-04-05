import { gql } from '@apollo/client/core';
import { MAIN_CATEGORY_ID } from '../config';

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($search: String, $categoryId: Int = ${MAIN_CATEGORY_ID}) {
    products(where: {search: $search, categoryId: $categoryId}) {
      nodes {
        ... on SimpleProduct {
          id
          databaseId
          name
          price (format: RAW)
          salePrice (format: RAW)
          regularPrice (format: RAW)
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          productCategories(where: {parent: 0}) {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`; 