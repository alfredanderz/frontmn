import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function Register() {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get("ref"); // Puede ser null

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    codigoPatrocinador: "", // Siempre empieza vacío
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Solo llenar si hay un código válido en la URL
    if (refCode && refCode !== "undefined" && refCode !== "null") {
      setFormData((prev) => ({ ...prev, codigoPatrocinador: refCode }));
    }
  }, [refCode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await register({
        ...formData,
        // Si está vacío o es "undefined", enviar null al backend
        codigoPatrocinador: formData.codigoPatrocinador.trim() || null,
      });

      // El backend te devuelve tu código generado
      console.log("Tu nuevo código de socio:", response.codigoSocio);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  // Solo mostrar mensaje si hay un código válido
  const hasValidRefCode =
    refCode && refCode !== "undefined" && refCode !== "null";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 my-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-600">Únete a MNPRAEIS</p>

          {/* Solo mostrar si viene con código válido */}
          {hasValidRefCode && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-green-800 text-sm">
                🎉 <strong>¡Has sido invitado!</strong> Código de referido:{" "}
                <span className="font-mono font-bold">{refCode}</span>
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />

            <Input
              label="Nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
            />

            <Input
              label="Apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />

          <Input
            label="Código de Patrocinador (Opcional)"
            name="codigoPatrocinador"
            value={formData.codigoPatrocinador}
            onChange={handleChange}
            placeholder="Déjalo vacío si no tienes uno"
            disabled={hasValidRefCode}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
