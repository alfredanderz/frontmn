import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import { formatCurrency } from "../../utils/helpers";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const response = await api.get("/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header con efecto glassmorphism */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/mn.png"
              alt="MNPRAEIS logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-yellow-600 bg-clip-text text-transparent">
              MNPRAEIS
            </span>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/login")}>Iniciar Sesión</Button>
            <Button variant="outline" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section mejorado */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-grey-600 to-yellow-600 text-white py-32">
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <span className="text-sm font-semibold">
              Únete a la Revolución del MLM
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Bienvenido a<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
              MNPRAEIS
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-blue-100 leading-relaxed">
            Tu oportunidad de crecer en el mundo del marketing multinivel con
            productos de calidad y un sistema de comisiones único
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/register")}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              ¡Únete Ahora! →
            </Button>

            <button
              onClick={() =>
                document
                  .getElementById("productos")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="text-white hover:text-blue-100 font-semibold transition-colors"
            >
              Ver Productos ↓
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir MNPRAEIS?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las ventajas de formar parte de nuestra comunidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Comisiones Atractivas
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema de comisiones multinivel que te permite crecer
                financieramente mientras ayudas a otros a tener éxito.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br  from-yellow-500 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Productos de Calidad
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Catálogo cuidadosamente seleccionado con productos que realmente
                marcan la diferencia en el mercado.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br  from-yellow-500 to-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Comunidad Activa
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Red de emprendedores comprometidos que se apoyan mutuamente para
                alcanzar sus metas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Estadísticas */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-yellow-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                1000+
              </div>
              <p className="text-gray-300 text-lg">Miembros Activos</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                500+
              </div>
              <p className="text-gray-300 text-lg">Productos Vendidos</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                98%
              </div>
              <p className="text-gray-300 text-lg">Satisfacción</p>
            </div>
            <div className="group">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                24/7
              </div>
              <p className="text-gray-300 text-lg">Soporte</p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Section mejorado */}
      <section id="productos" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nuestros Productos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección premium de productos cuidadosamente
            elegidos para ti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                {producto.imagenUrl && (
                  <img
                    src={producto.imagenUrl}
                    alt={producto.nombre}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Nuevo
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {producto.nombre}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {producto.descripcion}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {formatCurrency(producto.precio)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">
                      Disponible
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      {producto.stock} unidades
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 via-black to-yellow-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para comenzar tu viaje?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Únete a miles de emprendedores que ya están construyendo su futuro
            con MNPRAEIS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/register")}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Registrarse Gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </section>

      {/* Footer mejorado */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/mn.png"
                  alt="MNPRAEIS logo"
                  className="w-12 h-12 object-contain"
                />
                <span className="text-xl font-bold">MNPRAEIS</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transformando vidas a través del marketing multinivel
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => navigate("/sobre-nosotros")}
                >
                  Sobre Nosotros
                </li>
                <li
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => navigate("/mision-vision")}
                >
                  Misión y Visión
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  Equipo
                </li>
              </ul>
            </div>

            <div>
              {" "}
              {/*
<h4 className="font-bold mb-4 text-lg">Recursos</h4>
<ul className="space-y-2 text-gray-400 text-sm">
  <li className="hover:text-white transition-colors cursor-pointer">
    Plan de Compensación
  </li>
  <li className="hover:text-white transition-colors cursor-pointer">
    Capacitación
  </li>
  <li className="hover:text-white transition-colors cursor-pointer">
    FAQ
  </li>
</ul>
*/}
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => navigate("/soporte")}
                >
                  Soporte
                </li>
                <li
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => navigate("/soporte-email")}
                >
                  Email
                </li>
                <li className="hover:text-white transition-colors cursor-pointer">
                  <a
                    href="https://www.instagram.com/accounts/login/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Redes Sociales
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 MNPRAEIS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
