// components/ProductCard.jsx
import { useState } from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';
import ProductDetailModal from './ProductDetailModal';

export default function ProductCard({ product }) {
  const { agregarAlCarrito } = useCarrito();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
            src={product.imagen_url || product.image} 
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
            <span className="text-xs font-bold text-slate-700">{product.rating || 4.5}</span>
            <span className="text-xs text-gray-400">({product.reviews || 0})</span>
          </div>

          {/* Precio */}
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-600">
              ${(product.precio_unitario || product.precio).toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <Eye className="size-4" />
            Detalles
          </button>
          <button
            onClick={() => agregarAlCarrito(product)}
            className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <ShoppingCart className="size-4 flex items-center justify-center" />
            Añadir al carrito
          </button>
        </div>
      </div>

      {/* Modal de detalles */}
      <ProductDetailModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}