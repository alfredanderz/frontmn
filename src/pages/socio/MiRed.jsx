import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";

export default function MiRed() {
  const { user } = useAuth();
  const [referidos, setReferidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReferidos();
  }, []);

  const loadReferidos = async () => {
    try {
      const response = await api.get(`/api/socios/${user.socioId}/referidos`);
      setReferidos(response.data);
    } catch (error) {
      console.error("Error al cargar referidos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Mi Red de Referidos
      </h1>

      {referidos.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aún no tienes referidos
            </h3>
            <p className="text-gray-600 mb-6">
              Comparte tu código de referido para empezar a construir tu red
            </p>
          </div>
        </Card>
      ) : (
        <Card title={`Referidos Directos (${referidos.length}/7)`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {referidos.map((referido) => (
              <div
                key={referido.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {referido.nombres?.charAt(0)}
                    {referido.apellidos?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {referido.nombres} {referido.apellidos}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {referido.codigoSocio}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nivel:</span>
                    <span className="font-semibold">{referido.nivel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Teléfono:</span>
                    <span className="font-semibold">{referido.telefono}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {referidos.length > 0 && referidos.length < 7 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            💡 <strong>Tip:</strong> Puedes agregar {7 - referidos.length}{" "}
            referidos más a tu línea directa.
          </p>
        </div>
      )}
    </div>
  );
}
