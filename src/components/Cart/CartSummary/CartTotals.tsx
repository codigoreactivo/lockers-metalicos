export default function CartTotals({ subtotal, shipping = 0, discount = 0 }: { subtotal: number, shipping?: number, discount?: number }) {
  const total = subtotal + shipping - discount;

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>S/ {subtotal.toFixed(2)}</span>
      </div>
      
      {shipping > 0 && (
        <div className="flex justify-between text-gray-600">
          <span>Envío</span>
          <span>S/ {shipping.toFixed(2)}</span>
        </div>
      )}
      
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Descuento</span>
          <span>- S/ {discount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="border-t pt-3 mt-3">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-2xl text-gray-600 oswald">
            S/ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
} 