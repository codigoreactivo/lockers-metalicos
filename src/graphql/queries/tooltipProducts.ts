import { gql } from '@apollo/client/core';
import { PRODUCT_BASIC_FRAGMENT } from '../fragments/productBasic';
import { PRODUCT_IMAGE_FRAGMENT } from '../fragments/productImage';
import { TOOLTIP_CATEGORY_ID, TOOLTIP_PRODUCT_PER_PAGE } from '../config';
export const TOOLTIP_PRODUCTS_QUERY = gql`
  query ToolTipProducts {
    products(
      where: { 
        categoryId: ${TOOLTIP_CATEGORY_ID}, 
      },
      first: ${TOOLTIP_PRODUCT_PER_PAGE},
    ) {
      nodes {
        ... on SimpleProduct {
          ...ProductBasicFields
          ...ProductImageFields
        }
      }
    }
  }
  ${PRODUCT_BASIC_FRAGMENT}
  ${PRODUCT_IMAGE_FRAGMENT}
`; 