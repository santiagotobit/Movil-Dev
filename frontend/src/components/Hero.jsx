export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-r from-indigo-700 to-purple-600 py-12 px-6 overflow-hidden">
      {/* Contenedor centralizado para el contenido */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Lado del Texto (55% de ancho) */}
        <div className="md:w-7/12 z-10 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Los Mejores <br /> 
            <span className="text-white/90">Celulares al</span> <br />
            Mejor Precio
          </h1>
          <p className="mt-6 text-xl text-green-500 max-w-xl mx-auto md:mx-0">
            Descubre la última tecnología en smartphones. Ofertas exclusivas y envío gratis en compras superiores a $400.000.
          </p>
          <div className="mt-12 flex justify-center md:justify-start">
            <button className="bg-white text-purple-600 px-12 py-4 rounded-full font-bold text-lg hover:bg-green-500 transition shadow-lg">
              Ver Catálogo
            </button>
          </div>
        </div>

        {/* Lado de la Imagen o Placeholder (45% de ancho) */}
        <div className="md:w-5/12 flex justify-center relative">
          {/* Un círculo de luz decorativo de fondo */}
          <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>


          <img 
            src="https://ae01.alicdn.com/kf/S1ce0af8cd0384fc1b2e17f61ffb591a0x.jpg" 
            // src="https://zeropar.com/wp-content/uploads/2024/10/Bumblebee.webp" 
            alt="Celular" 
            className="w-full max-w-md drop-shadow-2xl z-10 rounded-3xl"
          />
          

        </div>
      </div>
    </section>
  );
}

    //   {/* Imagen (Aquí puedes poner la URL de una imagen de celular) */}
    //   <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
    //     <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
    //     <img 
    //       src="https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_15_pro__fba5ot8ayuey_xlarge.jpg" 
    //       alt="Celular" 
    //       className="w-full max-w-md drop-shadow-2xl z-10"
    //     />
    //   </div>