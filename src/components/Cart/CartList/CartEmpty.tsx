export default function CartEmpty() {
  return (
    <div className="text-center h-[60vh] flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-4 oswald text-black">Tu carrito está vacío</h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        No hay productos en tu carrito de compras. Explora nuestra tienda para encontrar lo que necesitas.
      </p>
      <a
        href="/productos"
        className="inline-block bg-[#EBBC2A] text-white px-8 py-3 rounded oswald text-sm lg:text-base hover:bg-[#EBBC2A]/90 transition-colors tracking-wide"
      >
        Ver Productos
      </a>
    </div>
  );
} 