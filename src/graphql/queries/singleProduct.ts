import { gql } from '@apollo/client/core';

export const SINGLE_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      id
      name
      description
      shortDescription
      slug
      ... on SimpleProduct {
        price(format: RAW)
        regularPrice(format: RAW)
        salePrice(format: RAW)
      }
      ... on VariableProduct {
        price(format: RAW)
        regularPrice(format: RAW)
        salePrice(format: RAW)
        variations {
          nodes {
            id
            databaseId
            name
            price(format: RAW)
            regularPrice(format: RAW)
            salePrice(format: RAW)
            attributes {
              nodes {
                name
                label
                value
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
      productCategories {
        nodes {
          databaseId
          name
          slug
          image {
            altText
            mediaItemUrl
            sourceUrl
          }
        }
      }
      featuredImage {
        node {
          altText
          mediaItemUrl
          sourceUrl
        }
      }
      galleryImages {
        nodes {
          altText
          sourceUrl
        }
      }
      related {
        nodes {
          id
          name
          databaseId
          ... on SimpleProduct {
            id
            databaseId
            name
            price(format: RAW)
            salePrice(format: RAW)
            regularPrice(format: RAW)
            shortDescription
            featuredImage {
              node {
                altText
                mediaItemUrl
                sourceUrl
              }
            }
            slug
            productCategories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`; 