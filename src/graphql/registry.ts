import { InMemoryCache } from '@apollo/client/core';
import { PRODUCT_BASIC_FRAGMENT } from './fragments/productBasic';
import { PRODUCT_IMAGE_FRAGMENT } from './fragments/productImage';
import { PRODUCT_FULL_FRAGMENT } from './fragments/productFull';
import { CATEGORY_BASIC_FRAGMENT } from './fragments/categoryBasic';
import { CATEGORY_IMAGE_FRAGMENT } from './fragments/categoryImage';
import { CATEGORY_FULL_FRAGMENT } from './fragments/categoryFull';
import { IMAGE_FRAGMENT } from './fragments/image';

/**
 * Registro centralizado de fragmentos GraphQL
 * 
 * Esta exportación permite tener una referencia centralizada a todos los fragmentos
 * y asegurar que sean importados una sola vez en la aplicación.
 */
export const fragmentRegistry = {
  // Fragmentos de productos
  ProductBasicFields: PRODUCT_BASIC_FRAGMENT,
  ProductImageFields: PRODUCT_IMAGE_FRAGMENT,
  ProductFullFields: PRODUCT_FULL_FRAGMENT,
  
  // Fragmentos de categorías
  CategoryBasicFields: CATEGORY_BASIC_FRAGMENT,
  CategoryImageFields: CATEGORY_IMAGE_FRAGMENT,
  CategoryFullFields: CATEGORY_FULL_FRAGMENT,
  
  // Otros fragmentos
  ImageFragment: IMAGE_FRAGMENT
};

/**
 * Función que genera una instancia única de fragmentos para evitar duplicaciones
 * 
 * La función recibe un objeto con claves que corresponden a los nombres de fragmentos
 * y devuelve un conjunto consolidado de definiciones de fragmentos para usar en las consultas.
 */
export function getFragmentDefinitions() {
  // Usamos un Set para almacenar las definiciones únicas de fragmentos
  const fragmentDefinitions = new Set();
  
  // Añadimos cada fragmento al conjunto
  Object.values(fragmentRegistry).forEach(fragmentDoc => {
    if (fragmentDoc && fragmentDoc.definitions) {
      fragmentDoc.definitions.forEach(def => {
        fragmentDefinitions.add(def);
      });
    }
  });
  
  return fragmentDefinitions;
}

/**
 * Crea una caché optimizada para Apollo Client con políticas
 * de tipo personalizadas para mejorar el rendimiento.
 */
export const createOptimizedCache = () => {
  return new InMemoryCache({
    possibleTypes: {
      Product: ["SimpleProduct", "VariableProduct", "GroupProduct"],
      MediaItem: ["MediaDetails"],
    },
    typePolicies: {
      Query: {
        fields: {
          products: {
            // Aplicar un keyArgs para diferenciar consultas basadas en variables
            keyArgs: ["where", "first", "include"],
            // Política de fusión que mantiene los resultados de cada consulta separados
            merge(existing, incoming, { args }) {
              // Si no hay argumentos, simplemente devolvemos los datos entrantes
              if (!args) return incoming;
              
              // Crear un identificador único para esta consulta
              const queryKey = JSON.stringify(args);
              
              // Si no hay datos existentes, iniciamos un nuevo mapa
              const result = existing || {};
              
              // Almacenamos los datos entrantes bajo su identificador único
              return {
                ...result,
                [queryKey]: incoming,
                // Preservamos los nodos originales para compatibilidad
                nodes: incoming.nodes,
              };
            },
            // Cuando leemos, intentamos obtener los datos específicos de esta consulta
            read(existing, { args }) {
              if (!existing || !args) return existing;
              
              const queryKey = JSON.stringify(args);
              
              // Si tenemos datos específicos para esta consulta, los devolvemos
              if (existing[queryKey]) {
                return existing[queryKey];
              }
              
              // Fallback a los nodos generales (compatibilidad)
              return existing;
            }
          },
          productCategories: {
            keyArgs: ["where", "first"],
            merge(existing, incoming, { args }) {
              if (!args) return incoming;
              
              const queryKey = JSON.stringify(args);
              const result = existing || {};
              
              return {
                ...result,
                [queryKey]: incoming,
                nodes: incoming.nodes,
              };
            }
          }
        }
      },
      // Políticas para entidades específicas
      SimpleProduct: {
        keyFields: ['id'],
        fields: {
          price: {
            read(price) {
              // Normalización de precios para presentación consistente
              return price || "0";
            }
          }
        }
      },
      MediaItem: {
        // Simplificamos la política para MediaItem
        // Optamos por NO almacenar en caché los objetos MediaItem
        // para evitar conflictos de identificación
        keyFields: false,
        // Esta configuración indica a Apollo que no intente
        // normalizar objetos MediaItem en la caché
        merge: true
      }
    }
  });
}; 