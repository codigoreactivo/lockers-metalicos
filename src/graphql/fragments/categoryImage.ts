import { gql } from '@apollo/client/core';
import { IMAGE_FRAGMENT } from './image';

// Fragmento para imágenes de categoría
export const CATEGORY_IMAGE_FRAGMENT = gql`
  fragment CategoryImageFields on ProductCategory {
    image {
      ...ImageFields
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
          ...ImageFields
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
`; 