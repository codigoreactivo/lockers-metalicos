import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  notas: string;
}

interface CheckoutFormProps {
  onSubmit: (data: FormData) => Promise<boolean>;
  isSubmitting: boolean;
}

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    mode: 'onChange' // Validar al cambiar los campos
  });

  // Estado para controlar las secciones abiertas (pueden ser múltiples)
  const [openSections, setOpenSections] = useState([1]);

  // Función para alternar secciones abiertas
  const toggleSection = (sectionNumber: number) => {
    // Comprobar si la sección ya está abierta
    if (openSections.includes(sectionNumber)) {
      // Si ya está abierta, la cerramos
      setOpenSections(openSections.filter(section => section !== sectionNumber));
    } else {
      // Si está cerrada, la abrimos y mantenemos las demás
      setOpenSections([...openSections, sectionNumber]);

      // Validar campos de la sección anterior (solo para feedback visual)
      if (sectionNumber > 1) {
        trigger(['name', 'email', 'phone']);
      }
      if (sectionNumber > 2) {
        trigger(['address', 'city', 'postalCode']);
      }
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      console.log('Iniciando envío del formulario:', data);

      // Llamamos a onSubmit y capturamos cualquier error
      const success = await onSubmit(data);

      if (success) {
        console.log('Formulario enviado exitosamente');
      }
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      // Podríamos mostrar un mensaje de error específico aquí
      alert(`Error al procesar el pedido: ${error instanceof Error ? error.message : 'Revise sus datos e intente nuevamente'}`);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 oswald">
        Checkout
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Sección 1: Datos Personales */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className={`p-4 cursor-pointer flex justify-between items-center ${openSections.includes(1) ? 'bg-black text-white' : 'bg-gray-100'}`}
            onClick={() => toggleSection(1)}
          >
            <h3 className="font-bold text-lg oswald">
              1. Información de Contacto
            </h3>
            <span>
              {openSections.includes(1) ? '−' : '+'}
            </span>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections.includes(1) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nombre completo
                </label>
                <input
                  {...register("name", { required: "El nombre es requerido" })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido"
                    }
                  })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "El teléfono es requerido",
                    pattern: {
                      value: /^[0-9]{9}$/,
                      message: "Teléfono inválido (9 dígitos)"
                    }
                  })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black outline-none"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sección 2: Dirección de Envío */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className={`p-4 cursor-pointer flex justify-between items-center ${openSections.includes(2) ? 'bg-black text-white' : 'bg-gray-100'}`}
            onClick={() => toggleSection(2)}
          >
            <h3 className="font-bold text-lg oswald">
              2. Dirección de Envío
            </h3>
            <span>
              {openSections.includes(2) ? '−' : '+'}
            </span>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections.includes(2) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Dirección
                </label>
                <input
                  {...register("address", { required: "La dirección es requerida" })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black outline-none"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message as string}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ciudad
                  </label>
                  <input
                    {...register("city", { required: "La ciudad es requerida" })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black outline-none"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city.message as string}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Código Postal
                  </label>
                  <input
                    {...register("postalCode", { required: "El código postal es requerido" })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:border-black outline-none"
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.postalCode.message as string}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 3: Método de Pago */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div
            className={`p-4 cursor-pointer flex justify-between items-center ${openSections.includes(3) ? 'bg-black text-white' : 'bg-gray-100'}`}
            onClick={() => toggleSection(3)}
          >
            <h3 className="font-bold text-lg oswald">
              3. Método de Pago
            </h3>
            <span>
              {openSections.includes(3) ? '−' : '+'}
            </span>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections.includes(3) ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    id="bankTransfer"
                    {...register("paymentMethod", { required: "Seleccione un método de pago" })}
                    value="bankTransfer"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <label htmlFor="bankTransfer" className="font-medium">
                    Transferencia Bancaria
                  </label>
                </div>
                <div className="text-sm text-gray-600 ml-6">
                  <p>Realice su pago directamente a nuestra cuenta bancaria. Por favor, use el número de pedido como referencia de pago.</p>
                  <div className=" flex flex-col gap-1 mt-2 bg-white p-3 rounded border border-gray-200">
                    <p className="font-medium">Datos Bancarios:</p>
                    <div className="flex flex-row items-center gap-2">
                      <p><strong>Banco: </strong></p>
                      <img src="/metodos-de-pago/tranferencia/bcp-logo.png" alt="BCP" className="w-14 h-auto" />
                    </div>
                    <p><strong>Titular: </strong>FABRINSA PERU S.A.C.</p>
                    <p><strong>Cuenta: </strong>194-2381424-0-86</p>
                    <p><strong>CCI: </strong>00219400238142408699</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#EBBC2A] text-black py-3 rounded oswald text-xl 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#EBBC2A]/90'} 
                  transition-colors`}
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 