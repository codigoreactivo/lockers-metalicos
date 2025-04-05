import { useState } from 'react';
import { IoMdCall } from "react-icons/io";

const asesores = [
  { nombre: "Asesor FBS 1", tel: "978820017" },
  { nombre: "Asesor FBS 2", tel: "978820014" },
  { nombre: "Asesor FBS 3", tel: "993094770" }
];

const MenuAsesores = () => {
  const codeCountry = "+51";
  const [isOpen, setIsOpen] = useState(false);

  const formatPhoneNumber = (number: string) => {
    return number.match(/.{1,3}/g)?.join(' ') || number;
  };

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-2 rounded-lg border 
          ${isOpen
            ? 'bg-[#EBBC2A] border-[#EBBC2A]'
            : 'border-black text-black hover:bg-[#EBBC2A] hover:border-[#EBBC2A] '
          } transition-colors duration-200`}
      >
        <div className="flex items-center gap-2 oswald font-semibold">

          <IoMdCall className={`w-5 h-5 transition-transform duration-200  ${isOpen ? 'rotate-12' : ''}`} />
          <span>Llámanos</span>
        </div>

      </button>

      <div
        className={`
          absolute right-0 top-full mt-2 w-64 
          bg-white rounded-lg shadow-lg border border-gray-200 z-50
          transition-all duration-300 ease-in-out transform
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }
        `}
      >
        <ul className="p-2 flex flex-col gap-2">
          {asesores.map((asesor) => (
            <li
              key={asesor.tel}
              className="hover:bg-gray-900  rounded-lg group transition-all ease-out duration-200"
            >
              <a
                href={`tel:${codeCountry}${asesor.tel}`}

                className="flex flex-col px-4 py-2"
              >
                <div className="flex items-center gap-4">
                  <IoMdCall className="w-5 h-5 bg-black text-white rounded-full p-1 group-hover:bg-white group-hover:text-black " />


                  <div>
                    <div className="font-medium group-hover:text-gray-100 transition-colors duration-300 text-sm text-gray-700 oswald">{asesor.nombre}</div>
                    <div className=" group-hover:text-gray-100 transition-colors duration-300 text-xl font-semibold ">{formatPhoneNumber(asesor.tel)}</div>
                  </div>
                </div>
              </a>
            </li>

          ))}
        </ul>
      </div>

    </div>
  );
};

export default MenuAsesores; 