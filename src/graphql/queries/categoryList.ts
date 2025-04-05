import { gql } from '@apollo/client/core';

export const CATEGORY_LIST_QUERY = gql`
  query CategoryList($parent: Int, $first: Int) {
    productCategories(first: $first, where: { parent: $parent }) {
      nodes {
        id
        name
        slug
        count
        image {
          sourceUrl
          altText
        }
        categoriasWooExtendido {
          backgroundImage
          catalogoPdf {
            node {
              sourceUrl
            }
          }
          fotoDestacadaCatPro {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`; 