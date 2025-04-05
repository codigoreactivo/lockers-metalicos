import emailjs from '@emailjs/browser';

const EMAIL_CONFIG = {
    serviceId: 'service_zddtf4i',
    templateId: 'template_t3holm5',
    publicKey: 'Isp-oPKhSaUUdHB6K',
    // Correo electrónico de la empresa
    companyEmail: 'ventas@fabrinsaperu.com' // Reemplaza con el correo real de la empresa
};

export const prepareOrderData = (formData: any, items: any) => {
    try {
        // Validamos que los items existan
        if (!items || Object.values(items).filter(Boolean).length === 0) {
            throw new Error('No hay productos en el carrito');
        }

        // Validamos campos requeridos del formulario
        if (!formData.name || !formData.email || !formData.phone) {
            throw new Error('Faltan datos personales requeridos');
        }

        // Validamos campos de dirección
        if (!formData.address || !formData.city) {
            throw new Error('Faltan datos de dirección requeridos');
        }

        const processedItems = Object.values(items)
            .filter(Boolean)
            .map(item => {
                // Aseguramos que featuredImage exista
                const imageUrl = (item as any)?.featuredImage?.node?.sourceUrl || '';
                const price = parseFloat((item as any).price) || 0;

                return {
                    name: (item as any).name || 'Producto sin nombre',
                    image: imageUrl,
                    quantity: (item as any).quantity || 1,
                    price: `S/ ${price.toFixed(2)}`,
                    total: `S/ ${(price * ((item as any).quantity || 1)).toFixed(2)}`
                };
            });

        const total = Object.values(items)
            .filter(Boolean)
            .reduce((sum: number, item: any) => {
                const price = parseFloat((item as any).price) || 0;
                const quantity = (item as any).quantity || 1;
                return sum + (price * quantity);
            }, 0);

        console.log('Productos procesados:', processedItems);
        console.log('Total calculado:', total);

        return {
            to_name: formData.name,
            to_email: formData.email,
            user_email: formData.email,
            email: formData.email,
            reply_to: formData.email,
            // Configuración para que el email llegue también a la empresa
            cc_to: EMAIL_CONFIG.companyEmail,
            company_email: EMAIL_CONFIG.companyEmail,
            to_phone: formData.phone,
            to_address: formData.address || '',
            to_city: formData.city || '',
            to_postal: formData.postalCode || '',
            items: processedItems,
            total: `S/ ${total.toFixed(2)}`,
            order_date: new Date().toLocaleDateString('es-ES'),
            order_time: new Date().toLocaleTimeString('es-ES')
        };
    } catch (error) {
        console.error('Error al preparar los datos del pedido:', error);
        throw error;
    }
};

export const sendOrderEmail = async (emailData: any) => {
    try {
        console.log('Iniciando envío de email con datos:', emailData);

        if (!emailData.reply_to && emailData.to_email) {
            emailData.reply_to = emailData.to_email;
        }

        // Aseguramos que el email llegue también a la empresa
        if (!emailData.cc_to) {
            emailData.cc_to = EMAIL_CONFIG.companyEmail;
        }

        emailjs.init(EMAIL_CONFIG.publicKey);

        // Primera llamada: enviar email al cliente
        const customerResponse = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            emailData
        );

        console.log('Email enviado al cliente exitosamente:', customerResponse);

        // Segunda llamada: enviar email a la empresa (con el mismo contenido)
        // Cambiamos el destinatario para esta copia
        const companyEmailData = {
            ...emailData,
            to_email: EMAIL_CONFIG.companyEmail,
            reply_to: emailData.to_email // Mantener reply_to como el email del cliente
        };

        const companyResponse = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            companyEmailData
        );

        console.log('Email enviado a la empresa exitosamente:', companyResponse);

        return customerResponse; // Devolvemos la respuesta del primer envío
    } catch (error) {
        console.error('Error al enviar email:', error);
        throw error;
    }
}; 