'use client';
import { useState, useEffect, memo } from 'react';
import * as pkg from '@apollo/client';
const { ApolloProvider } = pkg;
import { client } from '../../../../utils/apollo';
import HeroSliderContent from './HeroSliderContent';
import HeroSliderLoading from '../../../Skeletons/HeroSliderLoading';

// CSS
import 'swiper/css';
import 'swiper/css/pagination';
import '../Hero/HeroSlider.css';

// Componente principal que envuelve con ApolloProvider
const HeroSlider: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Renderiza un skeleton mientras no está montado
  if (!mounted) {
    return <HeroSliderLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <HeroSliderContent />
    </ApolloProvider>
  );
};

export default memo(HeroSlider);