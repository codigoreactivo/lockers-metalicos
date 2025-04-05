import { useState } from "react";
import { cartItems } from "../cartStore";
import { sendOrderEmail, prepareOrderData } from "../services/emailService";

export const useCheckout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: any, items: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Iniciando proceso de checkout con datos:', formData);
      console.log('Productos en el carrito:', items);

      // Verificar que hay productos en el carrito
      if (!items || Object.values(items).filter(Boolean).length === 0) {
        throw new Error("No hay productos en el carrito");
      }

      // Preparar datos de la orden
      const orderData = prepareOrderData(formData, items);
      console.log('Datos de orden preparados:', orderData);

      // Verificar que todos los datos necesarios están presentes
      if (!orderData.to_email || !orderData.to_name || !orderData.to_phone) {
        throw new Error("Faltan datos personales requeridos");
      }

      if (!orderData.reply_to) {
        orderData.reply_to = orderData.to_email;
      }

      // Guardar datos de la orden antes de enviar el email
      sessionStorage.setItem("lastOrder", JSON.stringify(orderData));
      console.log('Datos de orden guardados en sessionStorage');

      // Enviar email
      console.log('Enviando emails...');
      try {
        // Este método ahora envía dos emails: uno al cliente y otro a la empresa
        const response = await sendOrderEmail(orderData);
        console.log('Respuesta del servicio de email (cliente):', response);

        if (response && response.status === 200) {
          console.log('Emails enviados exitosamente, limpiando carrito...');
          // Limpiar carrito solo después de que todo esté guardado
          Object.keys(items).forEach((key) => {
            cartItems.setKey(key, undefined);
          });
          return true;
        } else {
          throw new Error(`Error al enviar el email: ${response ? response.text : 'Respuesta vacía'}`);
        }
      } catch (emailError) {
        console.error('Error al enviar los emails:', emailError);
        throw emailError;
      }

    } catch (error) {
      console.error('Error en el proceso de checkout:', error);
      // Si hay error, eliminar los datos guardados
      sessionStorage.removeItem("lastOrder");

      // Manejar error específico de EmailJS
      if (error instanceof Error && error.message.includes('recipients address is empty')) {
        setError("Error con la dirección de correo electrónico. Por favor, verifica que sea correcta.");
      } else if (error instanceof Error && error.message.includes('service_zddtf4i')) {
        setError("Error con el servicio de correo. Por favor, contacta al administrador.");
      } else {
        // Proporcionar un mensaje de error más específico
        const errorMessage = error instanceof Error ? error.message : "Hubo un error al procesar tu pedido";
        setError(`${errorMessage}. Por favor, intenta nuevamente.`);
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    handleSubmit,
  };
};
