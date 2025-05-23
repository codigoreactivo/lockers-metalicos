import { ApolloClient } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import { createOptimizedCache } from '../graphql/registry';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// Cargar mensajes de error detallados en desarrollo
const isDev = process.env.NODE_ENV !== "production";
if (isDev) {
    // Agregar mensajes de error solo en desarrollo
    console.log("Loading Apollo dev and error messages (development mode)");
    loadDevMessages();
    loadErrorMessages();
}

// Configurar el link HTTP para GraphQL
const httpLink = createHttpLink({
    uri: import.meta.env.PUBLIC_WP_GRAPHQL_URL,
    fetch,
});

// Tipos para el manejo de errores
interface GraphQLError {
    message: string;
    locations?: { line: number; column: number }[];
    path?: string[];
}

// Manejo de errores mediante un middleware
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        // Intentar continuar con datos en caché si es posible
        return forward(operation);
    }
});

// Crear el cliente Apollo con la configuración optimizada
export const client = new ApolloClient({
    link: errorLink.concat(httpLink),
    cache: createOptimizedCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true,
        },
        query: {
            fetchPolicy: 'cache-first',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
    assumeImmutableResults: false
});

// Configuramos las definiciones de los fragmentos
// No es necesario registrarlos manualmente en la caché
// ya que Apollo los manejará cuando se utilicen en las consultas 