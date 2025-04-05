import { useState, useEffect, memo } from 'react';
import * as pkg from '@apollo/client';
const { ApolloProvider } = pkg;
import { client } from '../../../utils/apollo';
import ProductSaleContent from './ProductSaleContent';
import ProductSaleLoading from '../../Skeletons/ProductSaleLoading';

// Componente principal que envuelve con ApolloProvider
const ProductSale: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Renderiza un skeleton mientras no está montado
  if (!mounted) {
    return <ProductSaleLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <ProductSaleContent />
    </ApolloProvider>
  );
}

export default memo(ProductSale);