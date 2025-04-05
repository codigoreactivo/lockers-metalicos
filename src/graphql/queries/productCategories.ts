import { gql } from '@apollo/client/core';
import { MAIN_CATEGORY_ID } from '../config';
export const PRODUCT_CATEGORIES_QUERY = gql`
  query ProductCategories {
    productCategories(where: { parent: ${MAIN_CATEGORY_ID} }) {
      nodes {
        id
        name
        slug
        link
        image {
          altText
          sourceUrl
        }
        categoriasWooExtendido {
          backgroundImage
          catalogoPdf {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`; 