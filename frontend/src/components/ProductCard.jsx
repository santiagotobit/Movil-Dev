import { ShoppingCart, Star } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

export default function ProductCard({ product }) {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
      {/* Imagen y Badges */}
      <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
            -{product.discount}%
          </span>
        )}
        <span className="absolute top-2 left-2 bg-amber-400 text-black text-[10px] font-bold px-2 py-1 rounded-lg z-10 uppercase">
          Más Vendido
        </span>
        <img 
          src={product.image} 
          alt={product.nombre}
          className="w-40 h-40 object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-xs text-gray-400 uppercase font-semibold">{product.marca}</p>
        <h3 className="font-bold text-slate-800 truncate">{product.nombre}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-slate-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Precio */}
        <div className="pt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-blue-600">${product.precio}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
          )}
        </div>
      </div>

      {/* Botón Añadir */}
      <button
        onClick={() => agregarAlCarrito(product)}
        className="w-full mt-4 bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-600 transition-colors">
        <ShoppingCart className="size-4" />
        Añadir al carrito
      </button>
    </div>
  );
}