// Re-exportamos todas las queries
export * from './queries';

// Re-exportamos todos los fragments
export * from './fragments';

// Re-exportamos la configuración
export * from './config';

// Re-exportamos los constructores de queries
export * from './queryBuilders';

// Re-exportamos el registro de fragmentos
export * from './registry';

// Re-exportamos el cliente Apollo
export { client } from '../utils/apollo';

/**
 * Este archivo centraliza todas las exportaciones relacionadas con GraphQL.
 * Ahora puedes importar de varias maneras:
 * 
 * 1. Importación general (menos eficiente pero más conveniente):
 * import { 
 *   // Queries predefinidas
 *   SINGLE_PRODUCT_QUERY,
 *   // Fragmentos
 *   PRODUCT_BASIC_FRAGMENT,
 *   // Configuración, etc.
 * } from '../graphql';
 * 
 * 2. Importación específica (más eficiente):
 * import { PRODUCT_BASIC_FRAGMENT } from '../graphql/fragments/productBasic';
 * import { createSaleProductsQuery } from '../graphql/queryBuilders';
 * 
 * La segunda opción es recomendada para componentes que solo necesitan
 * un fragmento o consulta específica, para reducir el tamaño del bundle.
 * 
 * 3. Registro centralizado (mejora rendimiento y evita duplicaciones):
 * import { fragmentRegistry } from '../graphql/registry';
 */ 