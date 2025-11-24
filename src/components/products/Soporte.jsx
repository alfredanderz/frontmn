import { useState } from "react";

export default function Soporte() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías hacer un api.post('/soporte', formData)
    console.log("Mensaje enviado:", formData);
    setEnviado(true);
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      <div
        className="max-w-2xl w-full bg-neutral-900 p-10 rounded-2xl shadow-2xl border border-yellow-500/30"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">
          Centro de Soporte
        </h1>
        <p className="text-gray-300 text-center mb-8">
          ¿Tienes algún problema o duda? Escríbenos y te ayudaremos lo antes
          posible.
        </p>

        {enviado ? (
          <div
            className="text-center text-green-400 text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✅ ¡Tu mensaje fue enviado correctamente!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-yellow-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:border-yellow-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-yellow-300 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:border-yellow-400 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-yellow-300 mb-1">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                rows="4"
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:border-yellow-400 outline-none transition resize-none"
              />
            </div>

            <button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-md transition-colors hover:bg-yellow-400"
            >
              Enviar Mensaje
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
