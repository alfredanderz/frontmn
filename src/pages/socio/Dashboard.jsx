import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get(
        `/api/socios/${user.socioId}/estadisticas`
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const copiarCodigo = () => {
    navigator.clipboard.writeText(stats?.codigoSocio);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const compartirEnlace = () => {
    const enlace = `${window.location.origin}/register?ref=${stats?.codigoSocio}`;
    navigator.clipboard.writeText(enlace);
    alert("¡Enlace de invitación copiado al portapapeles!");
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon="👥"
          title="Referidos Directos"
          value={stats?.referidosDirectos || 0}
          subtitle={`${
            7 - (stats?.referidosDirectos || 0)
          } espacios disponibles`}
          color="bg-blue-500"
        />
        <StatCard
          icon="🌳"
          title="Red Total"
          value={stats?.totalReferidos || 0}
          subtitle="Personas en tu red"
          color="bg-green-500"
        />
        <StatCard
          icon="📊"
          title="Nivel"
          value={stats?.nivel || 1}
          subtitle="En la red"
          color="bg-purple-500"
        />
        <StatCard
          icon="🎯"
          title="Mi Código"
          value={stats?.codigoSocio || "---"}
          subtitle="Comparte tu código"
          color="bg-orange-500"
        />
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tarjeta de Código de Referido ACTUALIZADA */}
        <Card title="Invita a Nuevos Socios">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white mb-4">
            <p className="text-sm mb-2">Tu código de referido</p>
            <p className="text-4xl font-bold mb-4 tracking-widest">
              {stats?.codigoSocio}
            </p>
            <p className="text-sm opacity-90">
              Comparte este código con personas que quieras invitar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={copiarCodigo}
              variant={copiado ? "success" : "primary"}
              className="w-full"
            >
              {copiado ? "✅ ¡Copiado!" : "📋 Copiar Código"}
            </Button>
            <Button
              onClick={compartirEnlace}
              variant="outline"
              className="w-full"
            >
              🔗 Compartir Enlace
            </Button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Consejo:</strong> Puedes enviar el enlace directo para
              que tus referidos se registren más rápido con tu código ya
              incluido.
            </p>
          </div>
        </Card>

        <Card title="Información de Cuenta">
          <div className="space-y-3">
            <InfoRow label="Usuario" value={user.username} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Rol" value={user.role} />
            <InfoRow
              label="Espacios Disponibles"
              value={`${stats?.espacioDisponible || 0} / 7`}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  );
}
