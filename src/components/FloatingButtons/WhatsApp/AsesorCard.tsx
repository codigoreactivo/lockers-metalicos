import { BsWhatsapp } from "react-icons/bs";
import type { Asesor } from "./data/asesoresData";
import { obtenerEstadoAsesor } from "./data/asesoresData";

interface AsesorCardProps {
    asesor: Asesor;
}

export const AsesorCard = ({ asesor }: AsesorCardProps) => {
    const estadoActual = asesor.horaApertura && asesor.horaCierre
        ? obtenerEstadoAsesor(asesor.horaApertura, asesor.horaCierre)
        : 'offline';

    // Formatear el horario para mostrar
    const formatearHora = (hora: number) => {
        const horas = Math.floor(hora);
        const minutos = Math.round((hora - horas) * 60);
        const periodo = horas >= 12 ? 'PM' : 'AM';
        const hora12 = horas > 12 ? horas - 12 : horas;
        return `${hora12}:${minutos.toString().padStart(2, '0')} ${periodo}`;
    };

    const horarioMostrado = asesor.horaApertura && asesor.horaCierre
        ? `${formatearHora(asesor.horaApertura)} - ${formatearHora(asesor.horaCierre)}`
        : asesor.horario || 'Horario no disponible';

    return (
        <div className="group">
            <div className="w-full bg-gray-50 group-hover:bg-black/20 duration-300 ease-linear flex flex-row justify-between items-center rounded-[6px] p-[0.6rem]">
                <a
                    href={asesor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex flex-row justify-between items-center"

                >
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-white ">
                                <img src={asesor.image} alt={asesor.name} className="w-10 h-10 p-2 rounded-full" />
                            </div>

                            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full animate-pulse ${estadoActual === 'online' ? 'bg-green-500' : 'bg-gray-500'
                                }`} />
                        </div>

                        <ul className="flex flex-col leading-none">
                            <li className="text-sm font-medium">{asesor.name}</li>
                            {/*<li className="font-normal text-xs opacity-90">{asesor.cargo}</li>*/}
                            <li className="text-xs text-gray-600 font-light">{horarioMostrado}</li>
                        </ul>
                    </div>



                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Chatear
                        </span>
                        <BsWhatsapp className="text-[#2DB742] text-xl" />
                    </div>
                </a>
            </div>
        </div>
    );
} 