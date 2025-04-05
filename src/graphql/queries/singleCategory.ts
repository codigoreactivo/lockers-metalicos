import { gql } from '@apollo/client/core';

export const SINGLE_CATEGORY_QUERY = gql`
  query SingleCategory($id: ID!, $categoryIn: [String]) {
    productCategory(id: $id, idType: SLUG) {
      id
      count
      slug
      name
      description
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
      products(where: { categoryIn: $categoryIn }) {
        nodes {
          ... on SimpleProduct {
            id
            name
            slug
            price (format: RAW)
            regularPrice (format: RAW)
            salePrice (format: RAW)
            onSale
            shortDescription
            featuredImage {
              node {
                altText
                sourceUrl
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`; 