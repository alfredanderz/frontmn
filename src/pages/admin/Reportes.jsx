import { useState, useEffect } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";
import { formatCurrency } from "../../utils/helpers";

export default function AdminReportes() {
  const [stats, setStats] = useState({
    ventasTotales: 0,
    pedidosTotales: 0,
    sociosActivos: 0,
    productosVendidos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Aquí deberías crear endpoints específicos para reportes
      const [socios, pedidos] = await Promise.all([
        api.get("/socios"),
        api.get("/pedidos"),
      ]);

      const ventasTotales = pedidos.data.reduce(
        (sum, p) => sum + (p.total || 0),
        0
      );

      setStats({
        ventasTotales,
        pedidosTotales: pedidos.data.length,
        sociosActivos: socios.data.length,
        productosVendidos: 0, // Calcular según tus necesidades
      });
    } catch (error) {
      console.error("Error al cargar reportes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Ventas Totales</p>
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(stats.ventasTotales)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Pedidos Totales</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.pedidosTotales}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Socios Activos</p>
            <p className="text-3xl font-bold text-blue-600">
              {stats.sociosActivos}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Productos Vendidos</p>
            <p className="text-3xl font-bold text-purple-600">
              {stats.productosVendidos}
            </p>
          </div>
        </Card>
      </div>

      <Card title="Gráficas y Análisis">
        <div className="text-center py-12 text-gray-500">
          <div className="text-5xl mb-4">📊</div>
          <p>
            Aquí puedes integrar gráficas con librerías como Chart.js o Recharts
          </p>
        </div>
      </Card>
    </div>
  );
}
