import { useState, useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { asesores } from "./data/asesoresData";
import { AsesorCard } from "./AsesorCard";
import './WaComponent.css';

const FloatWa = () => {
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Cerrar al hacer click fuera solo cuando el diálogo está abierto
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mostrarDialogo && !(e.target as Element).closest('.float-wa-container')) {
        handleClose();
      }
    };

    if (mostrarDialogo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarDialogo]);

  const handleClose = () => {
    setIsAnimating(true);
    setMostrarDialogo(false);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toggleDialog = () => {
    if (mostrarDialogo) {
      handleClose();
    } else {
      setMostrarDialogo(true);
    }
  };

  return (
    <div className="float-wa-container">
      <button
        onClick={toggleDialog}
        className={`
          fixed right-6 bottom-6 z-40 rounded-full text-white 
          bg-[#2DB742] p-[0.8rem] cursor-pointer
          hover:bg-[#25a93b] transition-all duration-300
          ${mostrarDialogo ? 'shadow-lg scale-110' : ''}
        `}
        aria-label={mostrarDialogo ? "Cerrar chat" : "Abrir chat"}
      >
        {!mostrarDialogo && !isAnimating && (
          <span className="absolute top-0 left-0 inline-flex h-full w-full animate-ping rounded-full bg-[#2DB742] opacity-75"></span>
        )}

        {mostrarDialogo ? (
          <AiOutlineClose className="lg:text-4xl text-3xl p-1 rotate relative" />
        ) : (
          <BsWhatsapp className="lg:text-4xl text-3xl p-1 rotate relative" />
        )}
      </button>
      <div
        className={`
          bg-[#2DB742] rounded-[6px] fixed bottom-28 right-6 
          w-[340px] z-40 shadow-lg
          ${mostrarDialogo ? "fade-in" : isAnimating ? "fade-out" : "hidden-wa"}
        `}
      >
        <div className="p-4 text-white">
          <div className="flex items-start gap-4">
            <BsWhatsapp className="text-2xl mt-1" />
            <div>
              <p className="font-medium text-lg leading-tight">
                Chatea con tu asesor favorito
              </p>
              <p className="mt-2 text-sm opacity-90">
                Nuestros asesores están listos para atenderte
              </p>
            </div>
          </div>

          {/* Campo de mensaje predeterminado 
          <div className="mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full px-3 py-2 rounded text-gray-800 text-sm"
            />
          </div>*/}
        </div>

        <div className="bg-white rounded-b-[6px] max-h-[400px] overflow-y-auto">
          <div className="flex flex-col gap-3 p-2">
            {asesores.map((asesor) => (
              <AsesorCard key={asesor.name} asesor={asesor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatWa; 
