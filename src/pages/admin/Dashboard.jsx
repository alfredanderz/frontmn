import { useState, useEffect } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";
import { formatCurrency } from "../../utils/helpers";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSocios: 0,
    totalProductos: 0,
    pedidosPendientes: 0,
    ventasMes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [socios, productos, pedidos] = await Promise.all([
        api.get("/api/socios"), // ← OK (ADMIN)
        api.get("/api/productos"), // ← productos activos
        api.get("/api/pedidos/estado/PENDIENTE"), // ← ruta correcta
      ]);

      setStats({
        totalSocios: socios.data.length,
        totalProductos: productos.data.length,
        pedidosPendientes: pedidos.data.length,
        ventasMes: 0, // Calcular según tus necesidades
      });
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Administrativo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="👥"
          title="Total Socios"
          value={stats.totalSocios}
          color="bg-blue-500"
        />
        <StatCard
          icon="📦"
          title="Productos"
          value={stats.totalProductos}
          color="bg-green-500"
        />
        <StatCard
          icon="⚠️"
          title="Pedidos Pendientes"
          value={stats.pedidosPendientes}
          color="bg-orange-500"
        />
        <StatCard
          icon="💰"
          title="Ventas del Mes"
          value={formatCurrency(stats.ventasMes)}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div
          className={`${color} w-16 h-16 rounded-lg flex items-center justify-center text-3xl text-white`}
        >
          {icon}
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </Card>
  );
}
