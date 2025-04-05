export interface Asesor {
    name: string;
    image: string;
    cargo: string;
    link: string;
    horario?: string;
    horaApertura?: number; // hora en formato 24h
    horaCierre?: number; // hora en formato 24h
    estado?: 'online' | 'offline' | 'busy';
}

export const asesores: Asesor[] = [
    {
        name: "Asesor 1",
        image: "/faviconfbs.png",
        cargo: "Asesor de ventas",
        link: "https://api.whatsapp.com/send?phone=51978820017",
        horario: "9:00 AM - 6:00 PM",
        horaApertura: 9,
        horaCierre: 18,
    },
    {
        name: "Asesor 2",
        image: "/faviconfbs.png",
        cargo: "Asesor de ventas",
        link: "https://api.whatsapp.com/send?phone=51978820014",
        horario: "9:00 AM - 6:00 PM",
        horaApertura: 9,
        horaCierre: 18,
    },
    {
        name: "Asesor 3",
        image: "/faviconfbs.png",
        cargo: "Asesor de ventas",
        link: "https://api.whatsapp.com/send?phone=51993094770",
        horario: "9:00 AM - 6:00 PM",
        horaApertura: 9,
        horaCierre: 18,
    }
];

export const obtenerEstadoAsesor = (horaApertura: number, horaCierre: number): 'online' | 'offline' => {
    // Obtener la hora actual en Lima
    const ahora = new Date().toLocaleString('en-US', {
        timeZone: 'America/Lima',
        hour12: false,
    });

    const horaActual = new Date(ahora);
    const hora = horaActual.getHours();
    const minutos = horaActual.getMinutes();

    // Convertir la hora actual a decimal para comparación más precisa
    const horaDecimal = hora + (minutos / 60);

    return (horaDecimal >= horaApertura && horaDecimal < horaCierre) ? 'online' : 'offline';
}; 