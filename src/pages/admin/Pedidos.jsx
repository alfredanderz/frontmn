import { useState, useEffect } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Loading from "../../components/common/Loading";
import {
  formatCurrency,
  formatDate,
  getEstadoColor,
} from "../../utils/helpers";
import { ESTADOS_PEDIDO } from "../../utils/constants";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtro, setFiltro] = useState("TODOS");

  useEffect(() => {
    loadPedidos();
  }, [filtro]);

  const loadPedidos = async () => {
    try {
      const endpoint =
        filtro === "TODOS" ? "/pedidos" : `/admin/pedidos/estado/${filtro}`;
      const response = await api.get(endpoint);
      setPedidos(response.data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (pedidoId, nuevoEstado) => {
    try {
      await api.put(`/pedidos/${pedidoId}/estado`, { estado: nuevoEstado });
      alert("Estado actualizado exitosamente");
      loadPedidos();
      setShowModal(false);
    } catch (error) {
      console.error("Detalles del error al cambiar estado:", error);
      alert("Error al cambiar estado");
    }
  };

  const verDetalle = (pedido) => {
    setSelectedPedido(pedido);
    setShowModal(true);
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Pedidos</h1>

        <div className="flex gap-2">
          {["TODOS", "PENDIENTE", "APROBADO", "ENVIADO", "ENTREGADO"].map(
            (estado) => (
              <button
                key={estado}
                onClick={() => setFiltro(estado)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filtro === estado
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {estado}
              </button>
            )
          )}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nº Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Socio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-semibold">
                      {pedido.numeroPedido}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {pedido.socio?.nombres} {pedido.socio?.apellidos}
                      </p>
                      <p className="text-sm text-gray-500">
                        {pedido.socio?.codigoSocio}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(pedido.fechaPedido)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                    {formatCurrency(pedido.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(
                        pedido.estado
                      )}`}
                    >
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => verDetalle(pedido)}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de Detalle */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Pedido ${selectedPedido?.numeroPedido}`}
        size="lg"
      >
        {selectedPedido && (
          <div className="space-y-6">
            {/* Información del Socio */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Información del Socio
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                  <span className="text-gray-600">Nombre:</span>{" "}
                  <strong>
                    {selectedPedido.socio?.nombres}{" "}
                    {selectedPedido.socio?.apellidos}
                  </strong>
                </p>
                <p>
                  <span className="text-gray-600">Código:</span>{" "}
                  <strong>{selectedPedido.socio?.codigoSocio}</strong>
                </p>
                <p>
                  <span className="text-gray-600">Teléfono:</span>{" "}
                  <strong>{selectedPedido.socio?.telefono}</strong>
                </p>
              </div>
            </div>

            {/* Dirección de Envío */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Dirección de Envío
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{selectedPedido.direccionEnvio}</p>
                <p>{selectedPedido.ciudad}</p>
              </div>
            </div>

            {/* Productos */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Productos</h3>
              <div className="space-y-2">
                {selectedPedido.detalles?.map((detalle, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">
                        {detalle.producto?.nombre}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {detalle.cantidad}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatCurrency(detalle.subtotal)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  {formatCurrency(selectedPedido.total)}
                </span>
              </div>
            </div>

            {/* Comprobante */}
            {selectedPedido.comprobanteUrl && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Comprobante de Pago
                </h3>

                <a
                  href={selectedPedido.comprobanteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ver Comprobante 🔗
                </a>
              </div>
            )}

            {/* Acciones */}
            {selectedPedido.estado === "PENDIENTE" && (
              <div className="flex gap-3">
                <Button
                  variant="success"
                  onClick={() => cambiarEstado(selectedPedido.id, "APROBADO")}
                >
                  ✅ Aprobar Pedido
                </Button>
                <Button
                  variant="danger"
                  onClick={() => cambiarEstado(selectedPedido.id, "RECHAZADO")}
                >
                  ❌ Rechazar Pedido
                </Button>
              </div>
            )}

            {selectedPedido.estado === "APROBADO" && (
              <Button
                variant="primary"
                onClick={() => cambiarEstado(selectedPedido.id, "ENVIADO")}
              >
                📦 Marcar como Enviado
              </Button>
            )}

            {selectedPedido.estado === "ENVIADO" && (
              <Button
                variant="success"
                onClick={() => cambiarEstado(selectedPedido.id, "ENTREGADO")}
              >
                ✅ Marcar como Entregado
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
