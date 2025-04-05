import { gql } from '@apollo/client/core';
import { MAIN_CATEGORY_ID } from '../config';

// Consulta solo para categorías hijas de MAIN_CATEGORY_ID
export const MENU_CATEGORIES_QUERY = gql`
  query MenuCategories {
    productCategories(
      first: 20
      where: { 
        childOf: ${MAIN_CATEGORY_ID}  # Solo categorías hijas de la categoría principal
        exclude: [15]  # Excluir categorías no deseadas como 'Sin categoría'
      }
    ) {
      nodes {
        name
        slug
        databaseId
      }
    }
  }
`; 