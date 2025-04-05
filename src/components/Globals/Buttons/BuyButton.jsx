
const BuyButton = () => {
  return (
    <>
      <a
        href="/productos"
        className="text-white bg-black uppercase oswald font-semibold relative rounded-md py-3 px-6 w-full text-center text-base hover:bg-[#EBBC2A] hover:text-black group duration-300 transition-all ease-linear"
        rel="noopener noreferrer"
      >
        Comprar
        <span className="text-[#EBBC2A] group-hover:text-black">
          Ahora
        </span>
      </a>
    </>
  )
}

export default BuyButton
