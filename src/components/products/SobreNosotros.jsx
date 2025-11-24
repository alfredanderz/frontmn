import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

export default function SobreNosotros() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-950 text-white flex flex-col justify-center items-center px-6 py-20">
      {/* Contenedor principal */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Imagen */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
            alt="Equipo trabajando juntos"
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Texto */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            CEO FUNDADOR
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed">
            <strong>Melquiades Hernández Salgado</strong>
          </p>
          <p className="text-lg text-blue-100 leading-relaxed">
            En <strong>MNPRAEIS</strong> Mas de 30 años de experiencia en la
            industria.
          </p>
          <p className="text-lg text-blue-100 leading-relaxed">
            Creó una empresa solidaria con sus socios, pensando en el beneficio
            de todos.
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Imagen */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
            alt="Equipo trabajando juntos"
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Texto */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
            UNETE AL EQUIPO
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed">
            Empresa orgullosamente Mexicana
          </p>
          <p className="text-lg text-blue-100 leading-relaxed">
            -8 años operando en venta directa -2 años como Multinivel
            -Legalmente constituida
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/register")}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              ¡Únete Ahora! →
            </Button>

            <a
              href="https://www.linkedin.com/company/openai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline underline-offset-4 mt-3 transition-colors"
            >
              Conoce más sobre nosotros →
            </a>
          </div>
        </div>
      </div>

      {/* Separador decorativo con “scroll” */}
      <div className="w-full max-w-6xl mt-20 border-t border-white/20 pt-12 text-center">
        <p
          className="text-blue-100 italic tracking-wide text-sm
        hello
        voy a llevar a un amiguito el sabado
        Es aviso!

        "
        >
          “Creamos oportunidades, construimos redes, impulsamos sueños.”
        </p>
      </div>
    </div>
  );
}
