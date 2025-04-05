interface Product {
  name: string;
  price?: string;
}

export const createWhatsAppLink = (product: Product) => {
  const countryCode = "51";
  const tel = "978820017";
  
  const productName = product?.name || "producto";
  const productPrice = product?.price || "";

  const text = `¡Hola! 
Me interesa este producto:
*${productName}*
*S/${productPrice}*
¿Podrían brindarme más información?`;

  return `https://wa.me/${countryCode}${tel}?text=${encodeURIComponent(text)}`;
}; 