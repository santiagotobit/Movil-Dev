export default function Categories() {
  const categories = [
    {
      id: 'premium',
      title: 'Premium',
      image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800', // iPhone / High-end
      description: 'Lo último en tecnología y potencia',
      color: 'from-purple-900/80'
    },
    {
      id: 'gama-media',
      title: 'Gama Media',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800', // Android moderno
      description: 'El equilibrio perfecto entre precio y calidad',
      color: 'from-blue-900/80'
    },
    {
      id: 'economicos',
      title: 'Económicos',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800', // Celular sencillo
      description: 'Funcionalidad al alcance de todos',
      color: 'from-slate-900/80'
    }
  ];

  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800">Categorías</h2>
          <p className="text-gray-500 mt-2">Encuentra el equipo ideal según tus necesidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Imagen de fondo */}
              <img 
                src={cat.image} 
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay degradado para que el texto se lea bien */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-90`}></div>
              
              {/* Contenido de la tarjeta */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-bold text-white mb-2">{cat.title}</h3>
                <p className="text-white/80 text-sm mb-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {cat.description}
                </p>
                <button className="w-fit bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-purple-600 hover:text-white transition-colors">
                  Explorar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}