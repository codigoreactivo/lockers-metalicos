import { FaWhatsapp } from "react-icons/fa";
import { createWhatsAppLink } from '../../../../utils/whatsapp';

interface WhatsAppBuyButtonProps {
  product: {
    name: string;
    price?: string;
  };
}

export const WhatsAppBuyButtonReact = ({ product }: WhatsAppBuyButtonProps) => {
  const whatsappLink = createWhatsAppLink(product);

  return (
    <a
      href={whatsappLink}
      className="wa-buy-btn-pc flex items-center justify-center border border-black gap-2 text-black text-center text-xs bg-white uppercase oswald font-medium rounded-md py-3 w-full  hover:bg-green-500 hover:text-white group duration-300 hover:border-green-500 transition-all ease-linear break-words"
      rel="noopener noreferrer"
      target="_blank"
    >
      <FaWhatsapp size={16} />
      <p>Comprar en
        <span className=" group-hover:text-black transition-all duration-300 ease-linear"> WhatsApp</span></p>
    </a>
  );
};

export default WhatsAppBuyButtonReact;