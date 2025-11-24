import React, { useState } from "react";

export default function SoporteEmail() {
  const [nombre, setNombre] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleEnviar = (e) => {
    e.preventDefault();

    const destinatario = "20223tn060@utez.edu.mx";
    const cuerpo = encodeURIComponent(
      `Hola, soy ${nombre}.\n\n${mensaje}\n\nGracias.`
    );
    const link = `mailto:${destinatario}?subject=${encodeURIComponent(
      asunto
    )}&body=${cuerpo}`;

    window.location.href = link;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border border-yellow-600/40 rounded-2xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
          Soporte Técnico
        </h1>
        <p className="text-gray-400 text-center mb-10">
          ¿Tienes dudas o problemas? Envía un mensaje y te ayudaremos lo antes
          posible.
        </p>

        <form onSubmit={handleEnviar} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Nombre</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-yellow-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Asunto</label>
            <input
              type="text"
              required
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Motivo del mensaje"
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-yellow-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Mensaje</label>
            <textarea
              required
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Describe tu problema o pregunta..."
              rows="5"
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-yellow-600/30 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Enviar Mensaje ✉️
          </button>
        </form>
      </div>
    </div>
  );
}
