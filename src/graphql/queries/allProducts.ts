import { gql } from '@apollo/client/core';
import { MAIN_CATEGORY_ID } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
  query AllProducts($first: Int = 38) {
    products(where: { categoryId: ${MAIN_CATEGORY_ID} }, first: $first) {
      nodes {
        ... on SimpleProduct {
          id
          name
          averageRating
          commentCount
          databaseId
          excerpt
          featured
          featuredImage {
            node {
              sourceUrl
              altText
              caption
              databaseId
            }
          }
          link
          menuOrder
          onSale
          price (format: RAW)
          salePrice (format: RAW)
          regularPrice (format: RAW)
          shortDescription
          sku
          slug
          stockQuantity
          uri
          productCategories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`; 