import { useStore } from "@nanostores/react";
import { cartItems, isCartOpen } from "../../../cartStore";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function CartFlyoutToggle() {
  const [mounted, setMounted] = useState(false);
  const $cartItems = useStore(cartItems);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Estado inicial consistente
  const baseButton = (
    <button className="text-lg font-normal bebas inline-flex justify-center items-center gap-3 leading-normal  p-2 text-black relative">
      <div>
        <IoCartOutline size={24} />
      </div>
    </button>
  );

  if (!mounted) return baseButton;

  const itemCount = Object.values($cartItems)
    .filter(item => item)
    .reduce((sum, item) => sum + (item?.quantity || 0), 0);

  return (
    <button
      onClick={() => isCartOpen.set(true)}
      className="text-lg font-normal bebas inline-flex justify-center items-center gap-3 leading-normal  p-2 text-black relative"
    >
      <div>
        <IoCartOutline size={28} className=" hover:text-gray-500 transition duration-300 ease-in-out" />
      </div>
      
      
        <span className="absolute -top-2 -right-2 bg-black text-[#EBBC2A] text-[0.7rem] rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {itemCount}
        </span>
      
    </button>
  );
}
