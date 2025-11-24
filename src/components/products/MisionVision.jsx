export default function MisionVision() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-y-auto">
      {/* Hero Section */}
      <section className="relative py-32 text-center">
        {/* Fondo con brillo dorado */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/20 via-transparent to-black"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
            Nuestra Esencia
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            En MNPRAEIS, creemos en el poder del crecimiento compartido, la
            visión a largo plazo y el impacto positivo a través del
            emprendimiento.
          </p>
        </div>
      </section>

      {/* Sección de Misión */}
      <section className="py-24 px-6 bg-gradient-to-r from-black via-gray-900 to-yellow-900/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80"
              alt="Misión"
              className="rounded-2xl shadow-2xl border border-yellow-600/40 hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">
              Nuestra Misión
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Empoderar a miles de emprendedores mediante un modelo sostenible
              que combina productos de calidad, innovación constante y una red
              de apoyo humano inquebrantable.
            </p>
            <p className="text-gray-400 text-md leading-relaxed">
              Cada paso que damos busca inspirar, conectar y transformar vidas,
              ofreciendo herramientas reales para alcanzar la independencia
              financiera con propósito.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Visión */}
      <section className="py-24 px-6 bg-gradient-to-l from-black via-gray-900 to-yellow-900/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-6 text-yellow-400">
              Nuestra Visión
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Ser la red multinivel líder de Latinoamérica, reconocida por su
              ética, innovación y compromiso con el crecimiento personal y
              profesional de cada miembro.
            </p>
            <p className="text-gray-400 text-md leading-relaxed">
              Imaginamos un futuro donde el éxito sea compartido, la riqueza sea
              colectiva y la oportunidad esté al alcance de todos.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
              alt="Visión"
              className="rounded-2xl shadow-2xl border border-yellow-600/40 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Cierre Inspiracional */}
      <section className="py-24 text-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-semibold text-yellow-400 mb-6">
            “El futuro pertenece a quienes se atreven a construirlo.”
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            En MNPRAEIS no solo soñamos en grande, actuamos con propósito. Cada
            día es una nueva oportunidad para crecer, inspirar y transformar el
            mundo a través del liderazgo consciente.
          </p>
        </div>
      </section>
    </div>
  );
}
