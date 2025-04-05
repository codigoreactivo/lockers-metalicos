import { gql } from '@apollo/client/core';

// Fragmento básico para imágenes
export const IMAGE_FRAGMENT = gql`
  fragment ImageFields on MediaItem {
    sourceUrl
    altText
    mediaItemUrl
  }
`; 