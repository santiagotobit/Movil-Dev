import { Truck, ShieldCheck, CreditCard, Smartphone } from 'lucide-react';

export default function Features() {
  const items = [
    {
      icon: <Truck className="size-8 text-blue-600" />,
      title: "Envío Gratis",
      desc: "En compras superiores a $50.000"
    },
    {
      icon: <ShieldCheck className="size-8 text-green-600" />,
      title: "Garantía Oficial",
      desc: "12 meses en todos los productos"
    },
    {
      icon: <CreditCard className="size-8 text-purple-600" />,
      title: "Pago Seguro",
      desc: "PayPal, Stripe y contra entrega"
    },
    {
      icon: <Smartphone className="size-8 text-orange-600" />,
      title: "Productos Originales",
      desc: "100% auténticos y nuevos"
    }
  ];

  return (
    <section className="w-full bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gray-100 p-3 rounded-lg">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}