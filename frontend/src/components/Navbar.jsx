import { Search, ShoppingCart, User } from 'lucide-react';
import {NavLink} from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Barra superior negra - Ancho total */}
      <div className="w-full bg-[#0f172a] text-white text-xs py-2 px-4 md:px-10 flex justify-between items-center">
        <span>+54 11 1234-5678 | info@movildev.com</span>
        <span className="hidden sm:inline">Envío gratis en compras superiores a $50.000</span>
      </div>

      {/* Contenedor del contenido - Centrado pero con fondo blanco total */}
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg text-white font-bold text-xl">
            MD
          </div>
          <span className="font-bold text-2xl text-slate-800">Móvil Dev</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `transition ${isActive ? "text-purple-600 border-b-2 border-purple-600 " : "text-slate-600 hover:text-purple-600 bg-green-100 hover:bg-gray-200 rounded-full px-3 py-1"}`
            }
          >
            Inicio
          </NavLink>
          
          <NavLink 
            to="/catalogo" 
            className={({ isActive }) => 
              `transition ${isActive ? "text-purple-600 border-b-2 border-purple-600" : "text-slate-600 hover:text-purple-600"}`
            }
          >
            Catálogo
          </NavLink>
          
          <NavLink 
            to="/premium" 
            className={({ isActive }) => 
              `transition ${isActive ? "text-purple-600 border-b-2 border-purple-600" : "text-slate-600 hover:text-purple-600"}`
            }
          >
            Premium
          </NavLink>
          
          <NavLink 
            to="/gama-media" 
            className={({ isActive }) => 
              `transition ${isActive ? "text-purple-600 border-b-2 border-purple-600" : "text-slate-600 hover:text-purple-600"}`
            }
          >
            Gama Media
          </NavLink>
          
          <NavLink 
            to="/economicos" 
            className={({ isActive }) => 
              `transition ${isActive ? "text-purple-600 border-b-2 border-purple-600" : "text-slate-600 hover:text-purple-600"}`
            }
          >
            Económicos
          </NavLink>
        </div>

        {/* Buscador */}
        <div className="flex-1 max-w-md relative">
          <input 
            type="text" 
            placeholder="Buscar celulares..." 
            className="w-full bg-gray-100 border-none rounded-full py-2 px-5 pl-12 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <Search className="absolute left-4 top-2.5 text-gray-400 size-5" />
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-5">
          <button className="relative text-slate-700">
            <ShoppingCart className="size-6" />
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] rounded-full size-4 flex items-center justify-center">0</span>
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition">
            <User className="size-5" />
            Ingresar
          </button>
        </div>
      </div>
    </nav>
  );
}