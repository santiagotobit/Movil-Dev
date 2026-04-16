import { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado inicial: usuario no autenticado

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item => item.id === producto.id 
          ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Importante: Normalizamos el precio quitando la coma para que sea un número
      const precioNumerico = Number(producto.precio.replace(',', ''));
      return [...prev, { ...producto, precio: precioNumerico, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => 
      item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + delta) } : item
    ));
  };

  // Cálculos para el resumen (Imagen 391ea5.png)
  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const costoEnvio = (subtotal > 50000 || subtotal === 0) ? 0 : 1500;
  const iva = subtotal * 0.21;
  const total = subtotal + costoEnvio + iva;

  return (
    <CarritoContext.Provider value={{ 
      carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad,
      subtotal, costoEnvio, iva, total,
      isLoggedIn, setIsLoggedIn 
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Esta es la función que invocas en los componentes:
// Al final de tu archivo CarritoContext.jsx

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe estar dentro de CarritoProvider");
  }
  return context;
};
// Asegúrate de que no haya nada más después de esto.