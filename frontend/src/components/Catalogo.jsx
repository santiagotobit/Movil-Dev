import { useState, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';

export default function Catalogo({ categoriaInicial = 'Todas' }) {
    const [categoriaSel, setCategoriaSel] = useState(categoriaInicial);
  // Estado para filtros (puedes expandir esto luego)
    // const [categoriaSel, setCategoriaSel] = useState('Todas');

  const categorias = ['Todas', 'Premium', 'Gama Media', 'Económicos'];
  const marcas = ['Apple', 'Google', 'Motorola', 'Nothing', 'OPPO', 'OnePlus', 'Realme', 'Samsung', 'Xiaomi'];

    useEffect(() => {
        setCategoriaSel(categoriaInicial);
    }, [categoriaInicial]);
    

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Encabezado del Catálogo */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Catálogo de Celulares</h1>
        <p className="text-gray-500">12 productos disponibles</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR DE FILTROS (25% aprox) */}
        <aside className="w-full lg:w-64 space-y-8 bg-white p-6 rounded-2xl border border-gray-100 h-fit sticky top-24">
          <div className="flex items-center gap-2 border-b pb-4">
            <Filter className="size-5 text-purple-600" />
            <h2 className="font-bold text-lg">Filtros</h2>
          </div>

          {/* Filtro por Categoría */}
          <div>
            <h3 className="font-bold text-slate-700 mb-4">Categoría</h3>
            <div className="flex flex-col gap-2">
              {categorias.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaSel(cat)}
                  className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition ${
                    categoriaSel === cat 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-gray-50 text-slate-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por Marca */}
          <div>
            <h3 className="font-bold text-slate-700 mb-4">Marca</h3>
            <div className="space-y-3">
              {marcas.map(marca => (
                <label key={marca} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="size-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm text-slate-600 group-hover:text-purple-600 transition">{marca}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtro de Precio (Slider simplificado) */}
          <div>
            <h3 className="font-bold text-slate-700 mb-4">Precio: $0 - $1500</h3>
            <input type="range" min="0" max="1500" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600" />
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL (Cuadrícula de productos) */}
        <main className="flex-1">
          {/* Barra superior de ordenamiento */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:max-w-xs">
              <input 
                type="text" 
                placeholder="Buscar celulares..." 
                className="w-full bg-white border border-gray-200 rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
              Destacados <ChevronDown className="size-4" />
            </button>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Aquí usarías el map de tus productos reales */}
            {/* <ProductCard product={...} /> */}
            <div className="text-center py-20 col-span-full text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
              Aquí se mostrarán los productos filtrados según tu diseño.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}