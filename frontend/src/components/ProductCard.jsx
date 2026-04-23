// components/ProductCard.jsx
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import ProductDetailModal from './ProductDetailModal';

export default function ProductCard({ product }) {
  const { agregarAlCarrito } = useCarrito();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stock = Number(product.cantidad_stock || 0);
  const isOutOfStock = stock <= 0;
  const priceLabel =
    product.formattedPrice ??
    (product.precio != null && product.precio !== ''
      ? String(product.precio)
      : '—');

  return (
    <>
      <div className="group bg-gray-100 rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
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
            <span className="text-xs font-bold text-slate-700">{product.rating ?? 4.5}</span>
            <span className="text-xs text-gray-400">({product.reviews || 0})</span>
          </div>

          {/* Precio */}
          <div className="pt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-600">
              ${priceLabel}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>
            )}
          </div>

          <p className={`pt-2 text-xs font-semibold ${isOutOfStock ? 'text-red-600' : stock <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
            {isOutOfStock ? 'Sin stock disponible' : `Stock disponible: ${stock} unidad${stock === 1 ? '' : 'es'}`}
          </p>
        </div>

        {/* Botones */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-red-500 text-white py-1 rounded-4xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
          >
            <Eye className="size-5" />
            Detalles
          </button>
          <button
            onClick={() => agregarAlCarrito(product)}
            disabled={isOutOfStock}
            className={`flex-1 py-3 rounded-4xl font-bold flex items-center justify-center gap-2 transition-colors ${isOutOfStock ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600'}`}
          >
            <ShoppingCart className="size-4 flex items-center justify-center" />
            {isOutOfStock ? 'Sin stock' : 'Añadir al carrito'}
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