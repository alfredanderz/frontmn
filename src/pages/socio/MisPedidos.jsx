import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import {
  formatCurrency,
  formatDate,
  getEstadoColor,
} from "../../utils/helpers";

export default function MisPedidos() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      const response = await api.get(`/api/pedidos/socio/${user.socioId}`);
      setPedidos(response.data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mis Pedidos</h1>
        <Button onClick={() => navigate("/crear-pedido")}>
          ➕ Nuevo Pedido
        </Button>
      </div>

      {pedidos.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No tienes pedidos aún
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza a comprar productos para hacer crecer tu negocio
            </p>
            <Button onClick={() => navigate("/crear-pedido")}>
              Crear mi primer pedido
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <Card key={pedido.id}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      Pedido #{pedido.numeroPedido}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(
                        pedido.estado
                      )}`}
                    >
                      {pedido.estado}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">
                    📅 {formatDate(pedido.fechaPedido)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    📍 {pedido.direccionEnvio}, {pedido.ciudad}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary mb-2">
                    {formatCurrency(pedido.total)}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/pedido/${pedido.id}`)}
                  >
                    Ver Detalle
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
